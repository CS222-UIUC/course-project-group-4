from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource

COURSE_TABLE_NAME = 'Courses'
class CoursesRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db 

    def get_all(self):
        table = self.__db.Table(COURSE_TABLE_NAME)  
        response = table.scan()             
        return response.get('Items', [])  

    def get_course(self, crn: str, semester: str):
        try:
            table = self.__db.Table(COURSE_TABLE_NAME)     
            response = table.get_item(Key={'CRN': crn, 'semester': semester})
            return response.get('Items', []) 
        except ClientError as e:
            raise ValueError(e.response['Error']['Message'])

    def create_course(self, course: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        major_table = self.__db.Table("Majors")
        major_table.put_item(Item = {"Major": course.get("subject")})
        response = table.put_item(Item=course)
        return response

    def update_course(self, course: dict):
        table = self.__db.Table(COURSE_TABLE_NAME)
        response = table.update_item(        
            Key={'CRN': course.get('crn'), 'semester': course.get('semester')},
            UpdateExpression="""                
                set
                    subject =:subject,
                    number=:number,
                    title=:title,
                    section=:section,
                    schedule_type=:schedule_type,
                    term=:term,
                    primary_instructor=:primary_instructor,
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
                    avg = :avg,
                    std = :std,
                    percent_4 = :percent_4
            """,
            ExpressionAttributeValues={         # values defined in here will get injected to update expression
                    ':subject':course.get('Course Subject'),
                    ':number':course.get('Course Number'),
                    ':title':course.get('Course Title'),
                    ':section':course.get('Course Section'),
                    ':schedule_type':course.get('Sched Type'),
                    ':term':course.get('Term'),
                    ':primary_instructor':course.get('Primary Instructor'),
                    ':a_plus':course.get('A+'),
                    ':a':course.get('A'),
                    ':a_minus':course.get('A-'),
                    ':b_plus':course.get('B+'),
                    ':b':course.get('B'),
                    ':b_minus':course.get('B-'),
                    ':c_plus':course.get('C+'),
                    ':c':course.get('C'),
                    ':c_minus':course.get('C-'),
                    ':d_plus':course.get('D+'),
                    ':d':course.get('D'),
                    ':d_minus':course.get('D-'),
                    ':f':course.get('F'),
                    ':w':course.get('W'),
                    ':avg':course.get('Average Grade'),
                    ':std':course.get('Standard Deviation'),
                    ':percent_4':course.get('% 4.0\'s')
            },
            ReturnValues="UPDATED_NEW"          # return the newly updated data point
        )
        return response

    def delete_course(self, crn: str, semester: str):
        table = self.__db.Table(COURSE_TABLE_NAME)      # referencing to table Recipes
        response = table.delete_item(           # delete recipe using uuid
            Key={'CRN': crn, 'semester': semester}
        )
        return response

    def get_majors(self):
        major_table = self.__db.Table("Majors")
        response = major_table.scan()             
        return response.get('Items', [])  