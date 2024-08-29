from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models.user import User

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Security:
    @staticmethod
    def verify_password(plain_password, hashed_password)-> bool:
        return password_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_hashed_password(password) -> str:
        return password_context.hash(password)

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> User:
        user = db.query(User).filter(User.email == email).first()
        if not user or not user.check_password(password):
            return None
        return user
