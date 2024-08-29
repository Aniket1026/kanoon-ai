import secrets
import time
import logging
from fastapi import Request, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.user import User
from app.db.database import get_db


class SessionManager:
    session_store = {}
    session_expires = 3600
    @staticmethod
    def create_session_token(user_id: int) -> str:
        token = secrets.token_hex(16)
        session_expiration = time.time() + SessionManager.session_expires
        SessionManager.session_store[token] = {
            "user_id": user_id,
            "expires": session_expiration,
        }
        return token

    @staticmethod
    def validate_session_token(token: str) -> bool:
        if token not in SessionManager.session_store:
            return False
        session_data = SessionManager.session_store[token]
        if session_data["expires"] < time.time():
            del SessionManager.session_store[token]
            return False
        return True

    @staticmethod
    def get_current_user(req: Request, db: Session=Depends(get_db)) -> User:
        try:
            token = req.cookies.get("session_token")
            if not token or token not in SessionManager.session_store:
                raise HTTPException(status_code=401, detail="Not authenticated")

            if not SessionManager.validate_session_token(token):
                raise HTTPException(status_code=401, detail="Session Expired")

            user_id = SessionManager.session_store[token]["user_id"]
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(status_code=401, detail="User Not Found")
            return user
        except Exception as e:
            logging.error("Error in get_current_user: %s", str(e))
            raise HTTPException(status_code=401, detail=str(e))
            
