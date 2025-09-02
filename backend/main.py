from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from schema import Equation
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Server running successfully"}

@app.post("/solve")
async def solve_equation_image(
    file: UploadFile = File(...),
    previous: str = Form("[]")
):
    try:
        image_bytes = await file.read()

        prompt = f"""
        You are a math recognition and solving system.

        - Input: An image (handwritten/drawn math expression).
        - Context: Previous recognized LaTeX results are {previous}.
        - Task:
            1. Recognize the math expression from the image.
            2. Output the recognized LaTeX.
            3. Solve the expression and output the result.
        - Format: Return JSON with keys:
            {{
              "latex": "\\[ ... \\]",
              "result": "..."
            }}
        """

        response = model.generate_content([
            prompt,
            {"mime_type": file.content_type, "data": image_bytes}
        ])

        return eval(response.text)  # expect Gemini to return JSON
    except Exception as e:
        return {"error": str(e)}