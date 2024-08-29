import os
from dotenv import load_dotenv

load_dotenv()

class Settings :
    PDF_PATH = os.getenv("PDF_PATH")
    CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    POSTGRES_URL = os.getenv("POSTGRES_URL")

settings = Settings()    