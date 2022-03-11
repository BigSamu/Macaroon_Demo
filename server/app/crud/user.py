from typing import Optional, List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import User
from app.schemas import UserResponse, UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    # Declare model specific CRUD operation methods.
    pass

        
user = CRUDUser(User)