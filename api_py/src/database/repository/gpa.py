from boto3.resources.base import ServiceResource

GPA_TABLE_NAME = "gpa_final"


class GpaRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db

    def create_gpa(self, course: dict):
        table = self.__db.Table(GPA_TABLE_NAME)
        major_table = self.__db.Table("Majors")
        major_table.put_item(Item={"Major": course.get("subject")})
        response = table.put_item(Item=course)
        return response

    def update_gpa(self, course: dict):
        table = self.__db.Table(GPA_TABLE_NAME)
        response = table.update_item(
            Key={
                "id": course.get("ID"),
                "subject": course.get("Subject"),
            },
            UpdateExpression="""
                set
                    id = :id
                    year = :year,
                    term = :term,
                    subject = :subject,
                    number = :number,
                    title = :title,
                    section = :section,
                    schedule_type = :schedule_type,
                    primary_instructor = :primary_instructor,
                    a_plus = :a_plus,
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
            """,
            ExpressionAttributeValues={  # values defined in here will get injected to update expression
                ":id": course.get("ID"),
                ":year": course.get("Year"),
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