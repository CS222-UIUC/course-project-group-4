from pydantic import BaseModel


class GpaPostResponse(BaseModel):
    code: int


class CourseInfoPostResponse(BaseModel):
    code: int


class CourseInfoGetResponse(BaseModel):
    code: int
