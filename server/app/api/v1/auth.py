
   
from typing import Any, List
from datetime import datetime

from sqlalchemy.sql.expression import false

from fastapi import APIRouter, Depends, Request, Response,  HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from pymacaroons import Macaroon, Verifier
from pymacaroons.exceptions import MacaroonInvalidSignatureException


from app import schemas, crud
from app.api.deps import get_db

router = APIRouter()

    
@router.get("/request_macaroon")
def log_in(request: Request, db: Session = Depends(get_db)) -> Response:
    """
    Request Macaroon.
    """
    root_macaroon_config = crud.macaroon.get_all_by_type(db, type="root")[0]
    discharge_macaroon_config = crud.macaroon.get_all_by_type(db, type="discharge")[0]

    root_macaroon = Macaroon(
        location=root_macaroon_config.location,
        identifier=root_macaroon_config.identifier,
        key=root_macaroon_config.secret_key
    )

    discharge_macaroon = None

    # Add a caveat for the target service
    if root_macaroon_config.first_party_caveats_enabled:
        first_party_caveats = crud.caveat.get_all_by_location(db, location ="1st-party")
        for each in first_party_caveats:
            root_macaroon.add_first_party_caveat(each.predicate)

    if root_macaroon_config.third_party_caveats_enabled:
        root_macaroon.add_third_party_caveat(
            location=discharge_macaroon_config.location,
            key=discharge_macaroon_config.secret_key,
            key_id=discharge_macaroon_config.identifier
        )

        discharge_macaroon = Macaroon(
            location=discharge_macaroon_config.location,
            identifier=discharge_macaroon_config.identifier,
            key=discharge_macaroon_config.secret_key
        )
        third_party_caveats = crud.caveat.get_all_by_location(db, location ="3rd-party")
        for each in third_party_caveats:
            discharge_macaroon.add_first_party_caveat(each.predicate)
    
    content = {"message": "Mmmmmm... A Macaroon was sent!"}
    response = JSONResponse(content=content)

    serialized_root_macaroon = root_macaroon.serialize()
    response.set_cookie(key="rootMacaroonCookie", value=serialized_root_macaroon)

    if root_macaroon_config.third_party_caveats_enabled:
        serialized_discharge_macaroon = discharge_macaroon.serialize() 
        response.set_cookie(key="dischargeMacaroonCookie", value=serialized_discharge_macaroon)

    return response



@router.get("/verify_access/{picture_id}")
async def verify_access(*, picture_id: int, request: Request, db: Session = Depends(get_db)) -> bool:
    """
    Verify Access.
    """

    if request.cookies.get('rootMacaroonCookie') == None:
        return False

    root_macaroon_config = crud.macaroon.get_all_by_type(db, type="root")[0]
    discharge_macaroon_config = crud.macaroon.get_all_by_type(db, type="discharge")[0]
    first_party_caveats = crud.caveat.get_all_by_location(db, location ="1st-party")
    third_party_caveats = crud.caveat.get_all_by_location(db, location ="3rd-party")

    serialized_root_macaroon = request.cookies.get('rootMacaroonCookie')
    root_macaroon = Macaroon.deserialize(serialized_root_macaroon)

    prepared_discharge_macaroon = None
    discharge_macaroon = None
    if root_macaroon_config.third_party_caveats_enabled:
        if request.cookies.get('username') == "":
            return False
        if request.cookies.get('username').lower() not in discharge_macaroon_config.identifier:
            return False
        
        
        try:
            serialized_discharge_macaroon = request.cookies.get('dischargeMacaroonCookie')
            discharge_macaroon = Macaroon.deserialize(serialized_discharge_macaroon)
            prepared_discharge_macaroon = root_macaroon.prepare_for_request(discharge_macaroon)
        except:
            return False
        
    v = Verifier()
    
    def picture_access_validator(predicate):
        
        predicateList = []
        if "OR" in predicate:
            predicateList = predicate.split(' OR ')
        else:
            predicateList.append(predicate)
        
        resource_requested = f"pic_{picture_id}.jpg"
        for each in predicateList:
            if each.split('=')[0] != 'resource':
                return False
            elif each.split('=')[1] == resource_requested:
                return True
        return False

    def user_access_validator(predicate):
        
        predicateList = []
        if "OR" in predicate:
            predicateList = predicate.split(' OR ')
        else:
            predicateList.append(predicate)

        username_asking_access = request.cookies.get('username')
        for each in predicateList:
            if each.split('=')[0] != 'username':
                return False
            elif each.split('=')[1] == username_asking_access:
                return True
        return False
    
    def timeout_access_validator(predicate):

        if predicate.split('<')[0] != 'timeout':
            return False
        else:
            timeout_timestamp_creation = None
            for each in first_party_caveats:
                if "timeout" in each.predicate:
                    timeout_timestamp_creation= each.created_on
                    break
            for each in third_party_caveats:
                if "timeout" in each.predicate:
                    timeout_timestamp_creation= each.created_on
                    break
            time_elapsed=(datetime.now()-timeout_timestamp_creation).total_seconds()
            
            if int(predicate.split('<')[1]) > time_elapsed:
                return True
        return False

    v.satisfy_general(picture_access_validator)
    v.satisfy_general(user_access_validator)
    v.satisfy_general(timeout_access_validator)
    
    try:
        access_granted = v.verify(
            root_macaroon, 
            root_macaroon_config.secret_key, 
            [prepared_discharge_macaroon])
    except:
        access_granted = False
   
    return access_granted

