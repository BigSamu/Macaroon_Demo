import datetime

from sqlalchemy import (
    Column,
    Integer, 
    String,
    DateTime,
    Boolean
)

from app.database.base_class import Base

class Macaroon(Base):
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(255), nullable=False)
    identifier = Column(String(255), nullable=False)
    secret_key = Column(String(255), nullable=False)
    type = Column(String(255), nullable=False)
    first_party_caveats_enabled = Column(Boolean, nullable=False)
    third_party_caveats_enabled = Column(Boolean, nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_on = Column(DateTime, nullable=True, onupdate=datetime.datetime.utcnow)

    # def __repr__(self):
    #    return "<Macaroon {}>".format(self.title)
