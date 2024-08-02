from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class QueryBase(BaseModel):
    query_text: str
    answer_text : Optional[str] = None

class QueryCreate(QueryBase):
    pass

class QueryResponse(QueryBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True