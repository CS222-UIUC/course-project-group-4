from pydantic import Field
from pydantic import BaseModel
from typing import List

from repository.ciscourses import CISCoursesRepository


class Parent(BaseModel):
    calendaryear: int = Field(...)
    term: str = Field(...)
    subject: str = Field(...)


class CISCoursesModel(BaseModel):
    id: str = Field(...)
    parents: Parent = Field(...)
    label: str = Field(...)
    description: str = Field(...)
    credithours: str = Field(...)
    coursesectioninformation: str = Field(...)
    sectionregistrationnotes: str = Field(...)
    sectioncapparea: str = Field(...)
    termsoffered: List[str] = Field(...)


class CoursesDomain:
    def __init__(self, repository: CISCoursesRepository) -> None:
        self.__repository = repository

    def get_all(self):
        return self.__repository.get_all()

    def get_course(self, id: str):
        return self.__repository.get_course(id)

    def create_course(self, course: CISCoursesModel):
        return self.__repository.create_course(course.dict())

    def update_course(self, course: CISCoursesModel):
        return self.__repository.update_recipe(course.dict())

    def delete_recipe(self, id):
        return self.__repository.delete_recipe(id)
