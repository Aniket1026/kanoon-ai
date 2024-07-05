from langchain_chroma import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings

class ChromaService:
    def __init__(self, persist_directory: str):
        self.persist_directory = persist_directory
        self.embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.db = None
    
    def initialize_db(self):
        """Initialize or load the Chroma database."""
        self.db = Chroma(persist_directory=self.persist_directory, embedding_function=self.embedding_function)
    
    def add_documents(self, documents):
        """Add documents to the Chroma database."""
        if not self.db:
            self.initialize_db()

        self.db = Chroma.from_documents(
            documents=documents,
            embedding=self.embedding_function,
            persist_directory=self.persist_directory
        )

    def query_documents(self, query: str):
        if not self.db:
            self.initialize_db()
        return self.db.similarity_search(query)
    