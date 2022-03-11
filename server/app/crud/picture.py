from typing import Optional, List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Picture
from app.schemas import PictureResponse, PictureCreate, PictureUpdate


class CRUDPicture(CRUDBase[Picture, PictureCreate, PictureUpdate]):
    # Declare model specific CRUD operation methods.
    def get_all_by_title(self, db: Session, type: str) -> List[Picture]:
        return db.query(Picture).filter(Picture.type == type).all()

        
picture = CRUDPicture(Picture)