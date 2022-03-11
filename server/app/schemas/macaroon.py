from typing import Optional

from pydantic import BaseModel

# class Caveats_Enabled(BaseModel):
#     first_party: bool 
#     third_party: bool

class MacaroonBase(BaseModel):
    id: Optional[int]
    location: Optional[str]
    identifier: Optional[str]
    secret_key: Optional[str]
    type: Optional[str]
    first_party_caveats_enabled: Optional[bool]
    third_party_caveats_enabled: Optional[bool]
    identifier: Optional[str]
   

class MacaroonCreate(MacaroonBase):
    location: str
    identifier: str
    secret_key: str
    type: str
    first_party_caveats_enabled: bool
    third_party_caveats_enabled: bool
    identifier: str
   

class MacaroonUpdate(MacaroonBase):
    location: str
    identifier: str
    secret_key: str
    type: str
    first_party_caveats_enabled: bool
    third_party_caveats_enabled: bool
    identifier: str


class MacaroonResponse(BaseModel):
    location: str
    identifier: str
    secret_key: str
    type: str
    first_party_caveats_enabled: bool
    third_party_caveats_enabled: bool
    identifier: str
    class Config:
        orm_mode = True