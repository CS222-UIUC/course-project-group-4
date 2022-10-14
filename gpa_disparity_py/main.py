from typing import Union
from network.course.course_schedule_fetcher import CourseScheduleParameterConfig
from fastapi import FastAPI

app = FastAPI()


@app.get("/all-subjects")
async def read_root():
    subjects = ["ECE"]  # fetch subject list from DB
    return subjects


@app.get("/course-information/")
# http://127.0.0.1:8000/course-information/?subject=ECE&coursenumber=125&crn=12345
async def read_course_information(subject: str, coursenumber: int):
    return {"subject": subject, "coursenumber": coursenumber}


@app.get("/schedule-information/")
# http://127.0.0.1:8000/schedule-information/?year=2012&semester=fall&subject=ECE&coursenumber=125&crn=12345
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
