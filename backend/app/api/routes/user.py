from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.settings import settings
from app.services.document_service import DocumentService
from app.services.chroma_service import ChromaService
from app.services.llm_service import LLMService
from app.db.database import get_db
from app.models.user import User
from app.db.session_manager import SessionManager

import logging

user_router = APIRouter()

document_service = DocumentService(settings.PDF_PATH)
chroma_service = ChromaService(settings.CHROMA_DB_PATH)
llm_service = LLMService(settings.GOOGLE_API_KEY)     


@user_router.post("/ask-question")
async def ask_question(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(SessionManager.get_current_user),
):
    try:
        query = await request.body()
        print("QUERY : ", query)
        query = query.decode("utf-8")
        # documents = document_service.load_document()
        # split_docs = document_service.split_documents(documents)
        # chroma_service.initialize_db()
        # chroma_service.add_documents(split_docs)
        docs = chroma_service.query_documents(query)
        print("DOCS : ", docs)
        context = " ".join([doc.page_content for doc in docs])
        print("CONTEXT : ", context)

        async def generate():
            async for token in llm_service.generate_stream(context, query):
                yield f"data: {token}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(generate(), media_type="text/event-stream")
    except Exception as e:
        logging.error("Error in ask-question: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))
