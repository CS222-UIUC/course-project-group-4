from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource

from file_writer import write_to_file

COURSE_TABLE_NAME = "course_final"


class CourseInfoRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db

    def create_course_info(self, course_info: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        write_to_file(course_info)
        response = table.put_item(Item=course_info)
        return response

    def update_course_info(self, course_info: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        response = table.update_item(
            Key={
                "crn": course_info.get("CRN"),
                "yearterm": course_info.get("YearTerm"),
            },
            UpdateExpression="""
                set
                    year=year
                    term=term
                    yearterm=yearterm
                    subject=subject
                    number=number
                    name=name
                    description=description
                    credit_hours=credit_hours
                    section_info=section_info
                    degree_attributes=degree_attributes
                    schedule_information=schedule_information
                    crn=crn
                    section=section
                    status_code=status_code
                    part_of_term=part_of_term
                    section_title=section_title
                    section_credit_hours=section_credit_hours
                    section_status=section_status
                    enrollment_status=enrollment_status
                    type=type
                    type_code=type_code
                    start_time=start_time
                    end_time=end_time
                    days_of_week=days_of_week
                    room=room
                    building=building
                    instructors=instructors
            """,
            ExpressionAttributeValues={  # values defined in here will get injected to update expression
                "year": course_info.get("Year"),
                "term": course_info.get("Term"),
                "yearterm": course_info.get("YearTerm"),
                "subject": course_info.get("Subject"),
                "number": course_info.get("Number"),
                "name": course_info.get("Name"),
                "description": course_info.get("Description"),
                "credit_hours": course_info.get("Credit Hours"),
                "section_info": course_info.get("Section Info"),
                "degree_attributes": course_info.get("Degree Attributes"),
                "schedule_information": course_info.get("Schedule Information"),
                "crn": course_info.get("CRN"),
                "section": course_info.get("Section"),
                "status_code": course_info.get("Status Code"),
                "part_of_term": course_info.get("Part of Term"),
                "section_title": course_info.get("Section Title"),
                "section_credit_hours": course_info.get("Section Credit Hours"),
                "section_status": course_info.get("Section Status"),
                "enrollment_status": course_info.get("Enrollment Status"),
                "type": course_info.get("Type"),
                "type_code": course_info.get("Type Code"),
                "start_time": course_info.get("Start Time"),
                "end_time": course_info.get("End Time"),
                "days_of_week": course_info.get("Days of Week"),
                "room": course_info.get("Room"),
                "building": course_info.get("Building"),
                "instructors": course_info.get("Instructors"),
            },
            ReturnValues="UPDATED_NEW",  # return the newly updated data point
        )
        return response
