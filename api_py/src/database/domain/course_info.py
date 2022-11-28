import logging
from pydantic import Field
from pydantic import BaseModel
from typing import Optional
from database.domain.endpoint_response import CourseInfoPostResponse

from database.repository.course_info import CourseInfoRepository


class CourseInfoModel(BaseModel):
    year: Optional[str] = Field(alias="Year")
    term: Optional[str] = Field(alias="Term")
    yearterm: Optional[str] = Field(alias="YearTerm")
    subject: Optional[str] = Field(alias="Subject")
    number: Optional[str] = Field(alias="Number")
    name: Optional[str] = Field(alias="Name")
    description: Optional[str] = Field(alias="Description")
    credit_hours: Optional[str] = Field(alias="Credit Hours")
    section_info: Optional[str] = Field(alias="Section Info")
    degree_attributes: Optional[str] = Field(alias="Degree Attributes")
    schedule_information: Optional[str] = Field(alias="Schedule Information")
    crn: Optional[str] = Field(alias="CRN")
    section: Optional[str] = Field(alias="Section")
    status_code: Optional[str] = Field(alias="Status Code")
    part_of_term: Optional[str] = Field(alias="Part of Term")
    section_title: Optional[str] = Field(alias="Section Title")
    section_credit_hours: Optional[str] = Field(alias="Section Credit Hours")
    section_status: Optional[str] = Field(alias="Section Status")
    enrollment_status: Optional[str] = Field(alias="Enrollment Status")
    type: Optional[str] = Field(alias="Type")
    type_code: Optional[str] = Field(alias="Type Code")
    start_time: Optional[str] = Field(alias="Start Time")
    end_time: Optional[str] = Field(alias="End Time")
    days_of_week: Optional[str] = Field(alias="Days of Week")
    room: Optional[str] = Field(alias="Room")
    building: Optional[str] = Field(alias="Building")
    instructors: Optional[str] = Field(alias="Instructors")

    class Config:
        allow_population_by_field_name = True


class CourseInfoDomain:
    def __init__(self, repository: CourseInfoRepository) -> None:
        self.__repository = repository

    def create_course_info(self, course_info: CourseInfoModel):
        response = self.__repository.create_course_info(course_info.dict())
        logging.info(response)
        response_code = response["ResponseMetadata"]["HTTPStatusCode"]
        return CourseInfoPostResponse(code=response_code)