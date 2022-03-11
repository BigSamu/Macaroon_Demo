import datetime

from sqlalchemy import (
    Column,
    Integer, 
    String,
    DateTime
)

from app.database.base_class import Base

class Caveat(Base):
    id = Column(Integer, primary_key=True, index=True)
    predicate = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.datetime.now)
    updated_on = Column(DateTime, nullable=True, onupdate=datetime.datetime.now)

    # def __repr__(self):
    #    return "<Caveat {}>".format(self.title)
