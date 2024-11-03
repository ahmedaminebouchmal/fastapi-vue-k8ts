from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Metric(Base):
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    value = Column(Float, nullable=False)
    source = Column(String, nullable=False)
    
    # Metadata
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    class Config:
        orm_mode = True