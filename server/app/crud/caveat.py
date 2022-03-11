from typing import Optional, List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Caveat
from app.schemas import CaveatResponse, CaveatCreate, CaveatUpdate


class CRUDCaveat(CRUDBase[Caveat, CaveatCreate, CaveatUpdate]):
    # Declare model specific CRUD operation methods.
    def get_all_by_location(self, db: Session, location: str) -> List[Caveat]:
        return db.query(Caveat).filter(Caveat.location == location).all()

    def create_all_in(self, db: Session, *, list_obj_in: List[CaveatCreate]) -> List[Caveat]:
        list_obj_in_data = jsonable_encoder(list_obj_in)
        db_list_obj = [] 
        for obj_in_data in list_obj_in_data :
            db_list_obj.append(self.model(**obj_in_data))
        db.add_all(db_list_obj)
        db.commit()
        for db_obj in db_list_obj :
            db.refresh(db_obj)
        return db_list_obj
    
    def upsert_all_in(self, db: Session, *, list_obj_in: List[CaveatUpdate]) -> List[Caveat]:
        
        self.remove_all_not_in(db, list_obj_in)

        list_obj_in_data = jsonable_encoder(list_obj_in)
        db_list_obj = []
        for obj_in_data in list_obj_in_data :
            db_list_obj.append(self.model(**obj_in_data))
    
        for each in db_list_obj:
            db.merge(each)
        db.commit()

        return self.get_all(db)
     
    def remove_all_not_in(self, db: Session, list_obj_in: List[CaveatUpdate]) -> int:
        obj_ids_in = []
        for obj in list_obj_in:
            if obj.id != None:
                obj_ids_in.append(obj.id)
        objs_del = db.query(Caveat).filter(~Caveat.id.in_(obj_ids_in)).delete()
        db.commit()
        return objs_del

        
caveat = CRUDCaveat(Caveat)