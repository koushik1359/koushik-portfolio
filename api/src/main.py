import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Koushik Portfolio AI API", version="1.0.0")

# Standard CORS allowing the Next.js frontend to stream endpoints securely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    
@app.get("/")
def root():
    return {"service": "Koushik AI Portfolio API", "status": "online"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Detailed context representing Koushik's Portfolio for the RAG endpoint
RESUME_CONTEXT = """
You are Koushik's AI Assistant built into his portfolio website.
Your goal is to answer questions about Koushik and his 4 major AI/ML projects.
Be highly professional, concise, and heavily emphasize his technical skills in Python, Next.js, and Cloud Infrastructure.

PROJECT 1: Nexus AI Engine
- A multi-tenant generative AI data platform built with Next.js, FastAPI, Microsoft Azure, LangGraph, and Neon DB (PostgreSQL).
- Features zero-dollar cloud architecture and strict session-based schema isolation for LLM agent workflows.

PROJECT 2: Enterprise RAG
- Highly scalable Retrieval-Augmented Generation ecosystem for enterprise document uploads.
- Uses FastAPI, OpenAI Embeddings, and Vector Databases.

PROJECT 3: Medical AI Platform
- Clinical Computer Vision AI platform engineered to detect and classify complex retinal pathologies.
- Built using PyTorch and deployed as scalable inference endpoints on Azure.

PROJECT 4: CLV Churn Engine
- Predictive Machine Learning engine estimating Customer Lifetime Value and multi-horizon churn probability.
- Utilizes Scikit-learn Random Forests, pandas data pipelines, and Streamlit.

Koushik graduated in May 2025 and is currently open to full-stack ML engineer / AI architect roles in the US.
"""

# Initialize GPT-4o
llm = ChatOpenAI(model="gpt-4o", temperature=0.3)

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        messages = [
            SystemMessage(content=RESUME_CONTEXT),
            HumanMessage(content=request.message)
        ]
        
        response = llm.invoke(messages)
        return {"reply": response.content}
        
    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return {"reply": "Sorry, my AI brain is temporarily offline (API Key error or quota exceeded)."}
