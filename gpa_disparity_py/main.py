from typing import Union
from database.db import initialize_db
from database.repository.courses import CoursesRepository
from network.course.course_schedule_fetcher import CourseScheduleParameterConfig
from fastapi import FastAPI
from database.domain.courses import CoursesDomain

app = FastAPI()

resource = initialize_db()
course_domain = CoursesDomain(CoursesRepository(resource))


@app.get("/all-subjects/")
async def read_root():
    return course_domain.get_all_majors()


@app.get("/course-information/")
async def read_course_information(subject: str, coursenumber: int):
    return {"subject": subject, "coursenumber": coursenumber}


@app.get("/schedule-information/")
async def read_schedule_information(
    year: Union[int, None],
    semester: Union[str, None],
    subject: Union[str, None],
    coursenumber: Union[int, None],
    crn: Union[int, None],
):
    input_values = CourseScheduleParameterConfig(
        year, semester, subject, coursenumber, crn
    )
    return input_values
