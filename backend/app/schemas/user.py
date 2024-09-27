from pydantic import BaseModel , EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
    
class UserSignin(BaseModel):
    email: EmailStr
    password: str

class UserSigninResponse(BaseModel):
    user: UserResponse
    message: str
    media_type: str