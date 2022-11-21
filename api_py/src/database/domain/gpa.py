from pydantic import Field
from pydantic import BaseModel
from typing import Optional

from database.repository.gpa import GpaRepository


def pivot_dict(course: dict) -> dict:
    return {  # values defined in here will get injected to update expression
        "id": course.get("ID"),
        "year": course.get("Year"),
        "term": course.get("Term"),
        "subject": course.get("Subject"),
        "number": course.get("Number"),
        "title": course.get("Course Title"),
        "section": course.get("Course Section"),
        "schedule_type": course.get("Sched Type"),
        "term": course.get("Term"),
        "primary_instructor": course.get("Primary Instructor"),
        "a_plus": course.get("A+"),
        "a": course.get("A"),
        "a_minus": course.get("A-"),
        "b_plus": course.get("B+"),
        "b": course.get("B"),
        "b_minus": course.get("B-"),
        "c_plus": course.get("C+"),
        "c": course.get("C"),
        "c_minus": course.get("C-"),
        "d_plus": course.get("D+"),
        "d": course.get("D"),
        "d_minus": course.get("D-"),
        "f": course.get("F"),
        "w": course.get("W"),
    }


class GpaModel(BaseModel):
    id: Optional[str] = Field(...)
    year: Optional[str] = Field(...)
    term: Optional[str] = Field(...)
    subject: Optional[str] = Field(...)
    number: Optional[str] = Field(...)
    title: Optional[str] = Field(...)
    section: Optional[str] = Field(...)
    schedule_type: Optional[str] = Field(...)
    term: Optional[str] = Field(...)
    primary_instructor: Optional[str] = Field(...)
    a_plus: Optional[str] = Field(...)
    a: Optional[str] = Field(...)
    a_minus: Optional[str] = Field(...)
    b_plus: Optional[str] = Field(...)
    b_minus: Optional[str] = Field(...)
    c_plus: Optional[str] = Field(...)
    c: Optional[str] = Field(...)
    c_minus: Optional[str] = Field(...)
    d_plus: Optional[str] = Field(...)
    d: Optional[str] = Field(...)
    d_minus: Optional[str] = Field(...)
    f: Optional[str] = Field(...)
    w: Optional[str] = Field(...)


class GpaDomain:
    def __init__(self, repository: GpaRepository) -> None:
        self.__repository = repository

    def create_gpa_json(self, course):
        return self.__repository.create_gpa(pivot_dict(course))

    def create_gpa(self, course: GpaModel):
        return self.__repository.create_gpa(course.dict())

    def update_gpa(self, course: GpaModel):
        return self.__repository.update_recipe(course.dict())
