from boto3.resources.base import ServiceResource


COURSE_INFO_TABLE_NAME = "course_final"


class CourseInfoRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db

    def create_course_info(self, course_info: dict):
        table = self.__db.Table(COURSE_INFO_TABLE_NAME)
        response = table.put_item(Item=course_info)
        return response
