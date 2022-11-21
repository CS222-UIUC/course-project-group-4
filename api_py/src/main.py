import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api_get_endpoint_py.api_get_service import ApiGetService
from database.domain.course_info import CourseInfoModel
from database.domain.gpa import GpaModel

app = FastAPI()

# https://stackoverflow.com/questions/65635346/how-can-i-enable-cors-in-fastapi
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_service = ApiGetService()


@app.get("/gpa-info/")
async def read_schedule_information(subject: str):
    return api_service.query_gpa_information(subject)


@app.get("/all-subjects/")
async def read_all_subjects():
    return api_service.get_majors()


@app.get("/course-info/")
async def read_course_info(subject: str, number: str):
    return api_service.query_course_info(subject, str(number))


@app.post("/write-gpa")
async def write_gpa_info(data: GpaModel):
    pass


@app.post("/write-course-info")
async def write_course_info(data: CourseInfoModel):
    pass
