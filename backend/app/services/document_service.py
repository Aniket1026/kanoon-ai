from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocumentService:
    def __init__(self,pdf_path : str):
        self.pdf_path = pdf_path

    def load_document(self):
        loader = PyPDFLoader(self.pdf_path)
        return loader.load()
    
    def split_documents(self,documents):
        splitter = RecursiveCharacterTextSplitter(chunk_size=200,chunk_overlap=30)
        return splitter.split_documents(documents)