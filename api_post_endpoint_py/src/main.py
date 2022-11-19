import json
from fastapi import FastAPI

app = FastAPI()


@app.post("/write-gpa")
async def write_gpa_info(data: json):
    pass


@app.post("/write-course-info")
async def write_course_info(data: json):
    pass
