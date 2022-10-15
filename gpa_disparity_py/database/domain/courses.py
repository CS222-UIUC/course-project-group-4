from uuid import uuid4
from xmlrpc.client import Boolean
from pydantic import Field
from decimal import Decimal
from pydantic import BaseModel
from pydantic.types import UUID4
from typing import List, Optional

from repository.courses import CoursesRepository

def pivot_dict(self, course: dict) -> dict:
        return {         # values defined in here will get injected to update expression
                    'CRN':course.get('CRN'),
                    'semester': course.get('semester'),
                    'subject':course.get('Course Subject'),
                    'number':course.get('Course Number'),
                    'title':course.get('Course Title'),
                    'section':course.get('Course Section'),
                    'schedule_type':course.get('Sched Type'),
                    'term':course.get('Term'),
                    'primary_instructor':course.get('Primary Instructor'),
                    'a_plus':course.get('A+'),
                    'a':course.get('A'),
                    'a_minus':course.get('A-'),
                    'b_plus':course.get('B+'),
                    'b':course.get('B'),
                    'b_minus':course.get('B-'),
                    'c_plus':course.get('C+'),
                    'c':course.get('C'),
                    'c_minus':course.get('C-'),
                    'd_plus':course.get('D+'),
                    'd':course.get('D'),
                    'd_minus':course.get('D-'),
                    'f':course.get('F'),
                    'w':course.get('W'),
                    'avg':course.get('Average Grade'),
                    'std':course.get('Standard Deviation'),
                    'percent_4':course.get('% 4.0\'s')
            }

class CoursesModel(BaseModel):
    CRN: str = Field(...)
    semester: str = Field(...)
    subject: str = Field(...)
    number: str = Field(...)
    title: str = Field(...)
    section: str = Field(...)
    schedule_type: str = Field(...)
    term: str = Field(...)
    primary_instructor: str = Field(...)
    a_plus: str = Field(...)
    a: str = Field(...)
    a_minus: str = Field(...)
    b_plus: str = Field(...)
    b_minus: str = Field(...)
    c_plus: str = Field(...)
    c: str = Field(...)
    c_minus: str = Field(...)
    d_plus: str = Field(...)
    d: str = Field(...)
    d_minus: str = Field(...)
    f: str = Field(...)
    w: str = Field(...)
    avg: str = Field(...)
    std: str = Field(...)
    percent_4: str = Field(...) 


class CoursesDomain():
    def __init__(self, repository: CoursesRepository) -> None:
        self.__repository = repository

    def get_all(self):
        return self.__repository.get_all()

    def get_course(self, crn: str, semester: str):
        return self.__repository.get_course(crn, semester)

    def create_course_json(self, course):
        return self.__repository.create_course(pivot_dict(course))

    def create_course(self, course: CoursesModel):
        return self.__repository.create_course(course.dict())

    def update_course(self, course: CoursesModel):
        return self.__repository.update_recipe(course.dict())

    def delete_recipe(self, crn: str, semester: str):
        return self.__repository.delete_recipe(crn, semester)