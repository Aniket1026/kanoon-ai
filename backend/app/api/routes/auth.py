from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.db.database import get_db
from app.models.user import User
from app.core.security import Security
from app.db.session_manager import SessionManager
from app.schemas.user import UserSigninResponse

import logging
import json

router = APIRouter()


@router.post("/sign-up")
async def sign_up(user: UserCreate, db: Session = Depends(get_db)) -> dict[str, str]:
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=400, detail="Provided email is already registered"
            )
        hashed_password = Security.get_hashed_password(user.password)
        new_user = User(email=user.email, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "Sign up successfully"}
    except Exception as e:
        logging.error("Error in sign-up: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/sign-in")
async def sign_in(
    user: UserCreate, db: Session = Depends(get_db)
) -> UserSigninResponse:
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if not existing_user:
            raise HTTPException(status_code=400, detail="Incorrect email or password")

        if not Security.verify_password(user.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")

        token = SessionManager.create_session_token(existing_user.id)

        user_data = {
            "id": existing_user.id,
            "email": existing_user.email,
            "created_at": existing_user.created_at.isoformat(),
            "updated_at": existing_user.updated_at.isoformat(),
        }

        content = json.dumps({"user": user_data, "message": "Login successfully"})
        response = Response(content=content, media_type="application/json")
        response.set_cookie(
            key="session_token",
            value=token,
            httponly=True,
            secure=True,
            samesite="None",
        )

        return response

    except HTTPException as e:
        raise e

    except Exception as e:
        logging.error("Error in login: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/logout")
def logout(
    req: Request, response: Response, db: Session = Depends(get_db)
) -> dict[str, str]:
    try:
        token = req.cookies.get("session_token")
        if not token:
            raise HTTPException(status_code=400, detail="No active session found")

        if SessionManager.validate_session_token(token) is False:
            raise HTTPException(status_code=400, detail="Session Expired")

        response.delete_cookie(key="session_token")
        if token in SessionManager.session_store:
            del SessionManager.session_store[token]

        return {"message": "Logout successfully"}
    except Exception as e:
        logging.error("Error in logout: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))
