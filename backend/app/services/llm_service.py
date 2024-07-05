from langchain_google_genai import GoogleGenerativeAI

class LLMService:
    def __init__(self, api_key: str):
        self.llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=api_key)

    def generate_response(self, context: str, question: str):
        prompt = f"""
        You are sanvidhaan.ai, an AI model trained on the Indian Constitution.
        You are highly knowledgeable about the Indian Constitution and can answer any questions related to it briefly.
        Try to answer with reasoning and explanation.
        Please answer the below question, if you can't answer the question, please let me know.
        Context: {context}
        Question: {question}
        """
        response = self.llm.invoke(prompt)
        print("RESPONSE : ",response)
        return response
