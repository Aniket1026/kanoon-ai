from fastapi import APIRouter, Body, HTTPException,Request
from app.core.settings import settings
from app.services.document_service import DocumentService
from app.services.chroma_service import ChromaService
from app.services.llm_service import LLMService
import logging

router = APIRouter()

document_service = DocumentService(settings.PDF_PATH)
chroma_service = ChromaService(settings.CHROMA_DB_PATH)
llm_service = LLMService(settings.GOOGLE_API_KEY)

@router.post("/ask-question")
async def ask_question(request: Request):
    try:
        query = await request.body()
        print("QUERY : ",query)
        query = query.decode('utf-8') 
        # documents = document_service.load_document()
        # split_docs = document_service.split_documents(documents)
        # chroma_service.initialize_db()
        # chroma_service.add_documents(split_docs)
        docs = chroma_service.query_documents(query)
        print("DOCS : ",docs)
        context = " ".join([doc.page_content for doc in docs])
        print("CONTEXT : ",context)
        response = llm_service.generate_response(context, query)
        return {"response": response}
    except Exception as e:
        logging.error("Error in ask-question: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))    