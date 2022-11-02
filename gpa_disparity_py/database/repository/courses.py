from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource

COURSE_TABLE_NAME = "testcourse"


class CoursesRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db

    def get_all(self):
        table = self.__db.Table(COURSE_TABLE_NAME)
        response = table.scan()
        return response.get("Items", [])

    def get_course(self, subject: str, year: str):
        try:
            table = self.__db.Table(COURSE_TABLE_NAME)
            response = table.get_item(Key={"subject": subject, "year": year})
            return response["Item"]
        except ClientError as e:
            raise ValueError(e.response["Error"]["Message"])

    def create_course(self, course: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        response = table.put_item(Item=course)
        return response

    def update_course(self, course: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        response = table.update_item(
            Key={"subject": course.get("subject"), "year": course.get("year")},
            UpdateExpression="""
                set
                    year=year,
                    term=:term,
                    subject=:subject,
                    number=:number,
                    title=:title,
                    schedule_type=:schedule_type,
                    a_plus =:a_plus,
                    a = :a,
                    a_minus = :a_minus,
                    b_plus = :b_plus,
                    b = :b,
                    b_minus = :b_minus,
                    c_plus = :c_plus,
                    c = :c,
                    d_minus = :c_minus,
                    d_plus = :d_plus,
                    d = :d,
                    d_minus = :d_minus,
                    f = :f,
                    w = :w,
                    primary_instructor=:primary_instructor,
            """,
            ExpressionAttributeValues={  # values defined in here will get injected to update expression
                ":year": course.get("year"),
                ":term": course.get("Term"),
                ":subject": course.get("Course Subject"),
                ":number": course.get("Course Number"),
                ":title": course.get("Course Title"),
                ":schedule_type": course.get("Sched Type"),
                ":a_plus": course.get("A+"),
                ":a": course.get("A"),
                ":a_minus": course.get("A-"),
                ":b_plus": course.get("B+"),
                ":b": course.get("B"),
                ":b_minus": course.get("B-"),
                ":c_plus": course.get("C+"),
                ":c": course.get("C"),
                ":c_minus": course.get("C-"),
                ":d_plus": course.get("D+"),
                ":d": course.get("D"),
                ":d_minus": course.get("D-"),
                ":f": course.get("F"),
                ":w": course.get("W"),
                ":primary_instructor": course.get("Primary Instructor"),
            },
            ReturnValues="UPDATED_NEW",  # return the newly updated data point
        )
        return response

    def delete_course(self, subject: str, year: str):
        table = self.__db.Table(COURSE_TABLE_NAME)  # referencing to table Recipes
        response = table.delete_item(  # delete recipe using uuid
            Key={"subject": subject, "year": year}
        )
        return response
