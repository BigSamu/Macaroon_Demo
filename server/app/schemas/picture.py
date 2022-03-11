from typing import Optional

from pydantic import BaseModel

class PictureBase(BaseModel):
    id: Optional[int]
    title: Optional[str]
    description: Optional[str]
   

class PictureCreate(PictureBase):
    title: str
    description: str
   

class PictureUpdate(PictureBase):
    title: str
    description: str


class PictureResponse(BaseModel):
    id: int
    title: str
    description: str
    class Config:
        orm_mode = True