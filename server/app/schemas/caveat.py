from typing import Optional

from pydantic import BaseModel

class CaveatBase(BaseModel):
    id: Optional[int]
    predicate: Optional[str]
    location: Optional[str]
   

class CaveatCreate(CaveatBase):
    predicate: str
    location: str
   

class CaveatUpdate(CaveatBase):
    predicate: str
    location: str


class CaveatResponse(BaseModel):
    id: int
    predicate: str
    location: str
    class Config:
        orm_mode = True