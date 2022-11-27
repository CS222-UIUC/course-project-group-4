import logging
from pydantic import Field
from pydantic import BaseModel
from typing import Optional
from database.domain.endpoint_response import GpaPostResponse

from database.repository.gpa import GpaRepository


class GpaModel(BaseModel):
    id: str = Field(alias="ID")
    subject: str = Field(alias="Subject")
    year: Optional[str] = Field(alias="Year")
    term: Optional[str] = Field(alias="Term")
    number: Optional[str] = Field(alias="Number")
    title: Optional[str] = Field(alias="Course Title")
    section: Optional[str] = Field(alias="Course Section")
    schedule_type: Optional[str] = Field(alias="Sched Type")
    term: Optional[str] = Field(alias="Primary Instructor")
    primary_instructor: Optional[str] = Field(alias="A+")
    a_plus: Optional[str] = Field(alias="A")
    a: Optional[str] = Field(alias="A-")
    a_minus: Optional[str] = Field(alias="B+")
    b_plus: Optional[str] = Field(alias="B")
    b_minus: Optional[str] = Field(alias="B-")
    c_plus: Optional[str] = Field(alias="C+")
    c: Optional[str] = Field(alias="C")
    c_minus: Optional[str] = Field(alias="C-")
    d_plus: Optional[str] = Field(alias="D+")
    d: Optional[str] = Field(alias="D")
    d_minus: Optional[str] = Field(alias="D-")
    f: Optional[str] = Field(alias="F")
    w: Optional[str] = Field(alias="W")

    class Config:
        allow_population_by_field_name = True


class GpaDomain:
    def __init__(self, repository: GpaRepository) -> None:
        self.__repository = repository

    def create_gpa(self, course: GpaModel):
        response = self.__repository.create_gpa(course.dict())
        logging.info(response)
        response_code = response["ResponseMetadata"]["HTTPStatusCode"]
        return GpaPostResponse(code=response_code)

    def update_gpa(self, course: GpaModel):
        return self.__repository.update_recipe(course.dict())
