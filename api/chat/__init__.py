import azure.functions as func
import json
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

# Reuse the context from the original main.py logic
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

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # Standard Azure Function V1 body parsing
        req_body = req.get_json()
        message = req_body.get('message')
        
        if not message:
            return func.HttpResponse(
                json.dumps({"reply": "I didn't receive a message. How can I help?"}),
                mimetype="application/json",
                status_code=400
            )

        # Initialize LLM (Ensure OPENAI_API_KEY is in Azure SWA secrets)
        llm = ChatOpenAI(model="gpt-4o", temperature=0.3)
        
        messages = [
            SystemMessage(content=RESUME_CONTEXT),
            HumanMessage(content=message)
        ]
        
        response = llm.invoke(messages)
        
        return func.HttpResponse(
            json.dumps({"reply": response.content}),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        return func.HttpResponse(
            json.dumps({"reply": f"AI Error: {str(e)}"}),
            mimetype="application/json",
            status_code=500
        )
