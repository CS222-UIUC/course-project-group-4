from pydantic import Field
from pydantic import BaseModel
from typing import Optional

from database.repository.course_info import CourseInfoRepository
from file_writer import write_to_file


def pivot_dict(course: dict) -> dict:
    return {  # values defined in here will get injected to update expression
        "year": course.get("Year"),
        "term": course.get("Term"),
        "yearterm": course.get("YearTerm"),
        "subject": course.get("Subject"),
        "number": course.get("Number"),
        "name": course.get("Name"),
        "description": course.get("Description"),
        "credit_hours": course.get("Credit Hours"),
        "section_info": course.get("Section Info"),
        "degree_attributes": course.get("Degree Attributes"),
        "schedule_information": course.get("Schedule Information"),
        "crn": course.get("CRN"),
        "section": course.get("Section"),
        "status_code": course.get("Status Code"),
        "part_of_term": course.get("Part of Term"),
        "section_title": course.get("Section Title"),
        "section_credit_hours": course.get("Section Credit Hours"),
        "section_status": course.get("Section Status"),
        "enrollment_status": course.get("Enrollment Status"),
        "type": course.get("Type"),
        "type_code": course.get("Type Code"),
        "start_time": course.get("Start Time"),
        "end_time": course.get("End Time"),
        "days_of_week": course.get("Days of Week"),
        "room": course.get("Room"),
        "building": course.get("Building"),
        "instructors": course.get("Instructors"),
    }


class CourseInfoModel(BaseModel):
    year: Optional[str] = Field(...)
    term: Optional[str] = Field(...)
    yearterm: Optional[str] = Field(...)
    subject: Optional[str] = Field(...)
    number: Optional[str] = Field(...)
    name: Optional[str] = Field(...)
    description: Optional[str] = Field(...)
    credit_hours: Optional[str] = Field(...)
    section_info: Optional[str] = Field(...)
    degree_attributes: Optional[str] = Field(...)
    schedule_information: Optional[str] = Field(...)
    crn: Optional[str] = Field(...)
    section: Optional[str] = Field(...)
    status_code: Optional[str] = Field(...)
    part_of_term: Optional[str] = Field(...)
    section_title: Optional[str] = Field(...)
    section_credit_hours: Optional[str] = Field(...)
    section_status: Optional[str] = Field(...)
    enrollment_status: Optional[str] = Field(...)
    type: Optional[str] = Field(...)
    type_code: Optional[str] = Field(...)
    start_time: Optional[str] = Field(...)
    end_time: Optional[str] = Field(...)
    days_of_week: Optional[str] = Field(...)
    room: Optional[str] = Field(...)
    building: Optional[str] = Field(...)
    instructors: Optional[str] = Field(...)


class CourseInfoDomain:
    def __init__(self, repository: CourseInfoRepository) -> None:
        self.__repository = repository

    def create_course_info_json(self, course_info: dict):
        return self.__repository.create_course_info(pivot_dict(course_info))

    def create_course_info_json(self, course_info):
        return self.__repository.create_course_info(pivot_dict(course_info))

    def update_course(self, course_info: CourseInfoModel):
        return self.__repository.update_recipe(course_info.dict())
