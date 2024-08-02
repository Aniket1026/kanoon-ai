from sqlalchemy import Column, Integer, String, DateTime , ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base_class import Base


class Query(Base):
    __tablename__ = 'queries'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    query_text = Column(String)
    answer_text = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="queries")