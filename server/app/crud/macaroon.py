from typing import Optional, List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Macaroon
from app.schemas import MacaroonResponse, MacaroonCreate, MacaroonUpdate


class CRUDMacaroon(CRUDBase[Macaroon, MacaroonCreate, MacaroonUpdate]):
    # Declare model specific CRUD operation methods.
    def get_all_by_type(self, db: Session, type: str) -> List[Macaroon]:
        return db.query(Macaroon).filter(Macaroon.type == type).all()

        
macaroon = CRUDMacaroon(Macaroon)