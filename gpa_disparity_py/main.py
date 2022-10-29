from typing import Union
from network.course.course_schedule_fetcher import CourseScheduleParameterConfig
from fastapi import FastAPI
from courses import get_all_majors

app = FastAPI()


@app.get(get_all_majors())
async def read_root():
    return get_all_majors()


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

