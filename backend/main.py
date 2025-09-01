from fastapi import FastAPI
from schema import Equation
import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()
app = FastAPI()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key) 

model = genai.GenerativeModel("gemini-1.5-flash")

@app.get("/")
def home():
    return {"message": "Server running successfully "}

@app.post("/solve")
async def solve_equation(req:Equation):
    try:
        prompt = f"""
        You are a math recognition system. 
        - Input: An SVG string representing a handwritten/drawn math expression. 
        - Context: Previous recognized LaTeX results are {req.previous}.
        - Task: Interpret the SVG as a mathematical expression and output ONLY the LaTeX.
        - Format: Return the result strictly inside \\[ and \\], nothing else.

        Example:
        SVG → "circle and x above it"
        Output → \\[ x^2 \\]

        SVG Content:
        {req.svg}
        """

        response = model.generate_content(prompt)

        return {
            "latex": response.text.strip()
        }
    except Exception as e:
        return {"error": str(e)}