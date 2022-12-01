from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware

from api_get_endpoint_py.api_get_service import ApiGetService
from config import config
from database.db import initialize_db
from database.domain.endpoint_response import GpaPostResponse, CourseInfoPostResponse
from database.repository.course_info import CourseInfoRepository
from database.repository.gpa import GpaRepository
from database.domain.course_info import CourseInfoDomain, CourseInfoModel
from database.domain.gpa import GpaDomain, GpaModel

import logging

logging.basicConfig(level=config.log_level.upper())

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

resource = initialize_db()


@app.get("/gpa-info/")
async def read_schedule_information(subject: str):
    return api_service.query_gpa_information(subject)


@app.get("/all-subjects/")
async def read_all_subjects():
    return api_service.get_majors()


@app.get("/course-info/")
async def read_course_info(subject: str, number: str):
    response = api_service.query_course_info(subject, str(number))
    logging.info(response)
    return response


@app.post("/write-gpa", response_model=GpaPostResponse)
async def write_gpa_info(data: GpaModel, key=Header()):
    if key == config.write_endpoint_key:
        gpa_domain = GpaDomain(GpaRepository(resource))
        response = gpa_domain.create_gpa(data)
        return response
    else:
        return GpaPostResponse(code=400)


@app.post("/write-course-info")
async def write_course_info(data: CourseInfoModel, key=Header()):
    if key == config.write_endpoint_key:
        course_info_domain = CourseInfoDomain(CourseInfoRepository(resource))
        response = course_info_domain.create_course_info(data)
        return response
    else:
        return CourseInfoPostResponse(code=400)
