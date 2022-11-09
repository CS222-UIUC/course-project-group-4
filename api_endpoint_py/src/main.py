from fastapi import FastAPI

from network.api_service import ApiService


app = FastAPI()
api_service = ApiService()


@app.get("/gpa-info/")
async def read_schedule_information(
    subject:str
):
    return api_service.query_gpa_information(subject)

@app.get("/all-subjects/")
async def read_all_subjects():
    return api_service.get_majors()

@app.get("/course-info/")
async def read_course_info(subject:str, number:str):
    return api_service.query_course_information(subject, str(number))
