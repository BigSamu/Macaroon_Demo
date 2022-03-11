from typing import Optional

from pydantic import BaseModel

class UserBase(BaseModel):
    id: Optional[int]
    username: Optional[str]
   

class UserCreate(UserBase):
    username: str
   

class UserUpdate(UserBase):
    username: str


class UserResponse(BaseModel):
    id: int
    username: str
    class Config:
        orm_mode = True