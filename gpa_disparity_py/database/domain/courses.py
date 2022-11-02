from uuid import uuid4
from xmlrpc.client import Boolean
from pydantic import Field
from decimal import Decimal
from pydantic import BaseModel
from pydantic.types import UUID4
from typing import List, Optional

from database.repository.courses import CoursesRepository


def pivot_dict(course: dict) -> dict:
    return {  # values defined in here will get injected to update expression
        "year": course.get("year"),
        "term": course.get("Term"),
        "subject": course.get("Course Subject"),
        "number": course.get("Course Number"),
        "title": course.get("Course Title"),
        "schedule_type": course.get("Sched Type"),
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
        "primary_instructor": course.get("Primary Instructor"),
    }


class CoursesModel(BaseModel):
    year: Optional[str] = Field(...)
    term: Optional[str] = Field(...)
    subject: Optional[str] = Field(...)
    number: Optional[str] = Field(...)
    title: Optional[str] = Field(...)
    section: Optional[str] = Field(...)
    schedule_type: Optional[str] = Field(...)
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
    primary_instructor: Optional[str] = Field(...)


class CoursesDomain:
    def __init__(self, repository: CoursesRepository) -> None:
        self.__repository = repository

    def get_all(self):
        return self.__repository.get_all()

    def get_course(self, subject: str, year: str):
        return self.__repository.get_course(subject, year)

    def create_course_json(self, course):
        return self.__repository.create_course(pivot_dict(course))

    def create_course(self, course: CoursesModel):
        return self.__repository.create_course(course.dict())

    def update_course(self, course: CoursesModel):
        return self.__repository.update_recipe(course.dict())

    def delete_course(self, subject: str, year: str):
        return self.__repository.delete_course(subject, year)

    def get_all_majors(self):
        items = self.get_all()
        return set([d.get("subject", None) for d in items])
