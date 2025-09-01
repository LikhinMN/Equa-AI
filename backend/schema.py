from pydantic import BaseModel
from typing import List

class Equation(BaseModel):
    svg: str              
    previous: List[str] = []
