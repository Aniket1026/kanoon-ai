import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.user import user_router
from app.api.routes.auth import router
from app.models.base_class import Base
from app.db.database import engine
import logging

app = FastAPI()
origins = ["*"]

logging.basicConfig()
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
try:
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")
except Exception as e:
    print(f"Error creating tables: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
