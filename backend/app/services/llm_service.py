from langchain_google_genai import GoogleGenerativeAI
import asyncio

class LLMService:
    def __init__(self, api_key: str):
        self.llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=api_key)
    
    async def generate_stream(self, context: str, query: str):
        
        full_response = self.generate_response(context, query)

        for word in full_response.split():
            yield word + " "
            await asyncio.sleep(0.05)
        yield "[DONE]"

    def generate_response(self, context: str, question: str):
        prompt = f"""
        You are kanoon.ai, an AI model trained on the Indian law.
        You are highly knowledgeable about the Indian law and can answer any questions related to it briefly.
        Try to answer with reasoning and explanation.
        Please answer the below question, if you can't answer the question, please let me know.
        Context: {context}
        Question: {question}
        """
        response = self.llm.invoke(prompt)
        print("RESPONSE : ",response)
        return response
