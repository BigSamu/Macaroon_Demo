import datetime

from sqlalchemy import (
    Column,
    Integer, 
    String,
    DateTime
)

from app.database.base_class import Base

class Picture(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_on = Column(DateTime, nullable=True, onupdate=datetime.datetime.utcnow)

    # def __repr__(self):
    #    return "<Caveat {}>".format(self.title)
