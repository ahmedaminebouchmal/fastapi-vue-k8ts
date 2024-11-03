from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class MetricBase(BaseModel):
    timestamp: datetime
    category: str
    value: float
    source: str

class MetricCreate(MetricBase):
    pass

class MetricUpdate(MetricBase):
    pass

class MetricInDB(MetricBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class MetricResponse(MetricInDB):
    pass