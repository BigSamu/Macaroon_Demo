
   
from typing import Any, List

from fastapi import APIRouter, Depends, Response,  HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from pymacaroons import Macaroon, Verifier

from app import schemas, crud
from app.api.deps import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.MacaroonResponse])
def read_all_macaroons(db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all macaroons.
    """
    macaroons = crud.macaroon.get_all(db)
    return macaroons

@router.get("/{macaroon_id}", response_model=schemas.MacaroonResponse)
def read_one_macaroon(macaroon_id:int, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve one macaroon.
    """
    macaroon = crud.macaroon.get_one(db, model_id=macaroon_id)
    if not macaroon:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The macaroon with this ID does not exist in the system.",
        )
    return macaroon

@router.get("/by_type/{macaroon_type}", response_model=List[schemas.MacaroonResponse])
def read_all_macaroons_by_location(macaroon_type: str, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all macaroons by type.
    """
    macaroons = crud.macaroon.get_all_by_type(db, type=macaroon_type)
    return macaroons

@router.post("", response_model=schemas.MacaroonResponse)
def create_macaroon(*, db: Session = Depends(get_db), macaroon_in: schemas.MacaroonCreate) -> Any:
    """
    Create new macaroons.
    """
    macaroon = crud.macaroon.create(db, obj_in=macaroon_in)
    return macaroon


@router.put("/{macaroon_id}", response_model=schemas.MacaroonResponse)
def update_macaroon(*, macaroon_id: int, db: Session = Depends(get_db), macaroon_in: schemas.MacaroonUpdate) -> Any:
    """
    Update existing macaroons.
    """
    macaroon = crud.macaroon.get_one(db, model_id=macaroon_id)
    if not macaroon:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The macaroon with this ID does not exist in the system.",
        )
    macaroon = crud.macaroon.update(db, db_obj=macaroon, obj_in=macaroon_in)
    return macaroon


@router.delete("/{macaroon_id}", response_model=schemas.Message)
def delete_one_macaroon(*, macaroon_id: int, db: Session = Depends(get_db)) -> Any:
    """
    Delete existing macaroon.
    """
    macaroon = crud.macaroon.get_one(db, model_id=macaroon_id)
    if not macaroon:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The macaroon with this ID does not exist in the system.",
        )
    crud.macaroon.remove_one(db, model_id=macaroon.id)
    return {"message": f"Macaroon with ID = {id} deleted."}

@router.delete("", response_model=schemas.Message)
def delete_all_macaroons(*, db: Session = Depends(get_db)) -> Any:
    """
    Delete all macaroons.
    """
    macaroons = crud.macaroon.get_all(db)
    if not macaroons:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="It doesn't exist any macaroon in the system.",
        )
    rows_deleted=crud.macaroon.remove_all(db)
    return {"message": f"{rows_deleted} macaroons were deleted."}