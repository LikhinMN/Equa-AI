from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI(title="Math Recognition API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  


@app.get("/")
def home():
    return {"message": "Math Recognition API is running successfully", "version": "1.0.0"}


@app.post("/solve")
async def solve_equation_image(file: UploadFile = File(...)):
    try:
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_IMAGE_TYPES)}"
            )

        image_bytes = await file.read()
        if len(image_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE / 1024 / 1024}MB"
            )
        
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Empty file")

        prompt = """
        You are a math recognition and solving system.

        - Input: An image containing a handwritten or drawn mathematical expression.
        - Task:
            1. Carefully recognize the mathematical expression from the image.
            2. Solve the expression step by step.
            3. Format the result in proper LaTeX notation.
            4. If the expression cannot be solved (e.g., incomplete equation), provide the recognized expression in LaTeX.

        - Output Format: Return ONLY a valid JSON object with these exact keys:
            {
              "latex": ["\\\\[ recognized_expression \\\\]", "\\\\[ solution_step_1 \\\\]", "\\\\[ final_result \\\\]"],
              "result": "final numerical or algebraic result",
              "steps": ["step 1 explanation", "step 2 explanation"],
              "recognized": "the original expression you recognized"
            }

        Important:
        - Always return valid JSON
        - Use double backslashes for LaTeX (\\\\[ and \\\\])
        - If you can't recognize the math clearly, return an error in the JSON
        - Show your work with clear steps
        """
        response = model.generate_content([
            prompt,
            {"mime_type": file.content_type, "data": image_bytes}
        ])

        logger.info(f"Gemini response: {response.text}")

        try:

            response_text = response.text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:] 
            if response_text.endswith("```"):
                response_text = response_text[:-3] 
            
            result = json.loads(response_text)
            if "latex" not in result:
                result["latex"] = ["\\[ \\text{Could not recognize expression} \\]"]
            
            return result

        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Gemini response: {e}")
            logger.error(f"Raw response: {response.text}")
            return {
                "latex": ["\\[ \\text{Error parsing response} \\]"],
                "result": "Could not process the mathematical expression",
                "error": "Failed to parse AI response",
                "raw_response": response.text[:500]  
            }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/solve-image")
async def solve_equation_image_legacy(file: UploadFile = File(...)):
    """Legacy endpoint for backward compatibility"""
    return await solve_equation_image(file)


@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "model": "gemini-1.5-flash",
        "api_version": "1.0.0"
    }