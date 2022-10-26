from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource

CISCOURSE_TABLE_NAME = 'CISCourses'
class CISCoursesRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db 

    def get_all(self):
        table = self.__db.Table(CISCOURSE_TABLE_NAME)  
        response = table.scan()             
        return response.get('Items', [])  

    def get_course(self, id: str):
        try:
            table = self.__db.Table(CISCOURSE_TABLE_NAME)     
            response = table.get_item(Key={'id': id})
            return response['Item']       
        except ClientError as e:
            raise ValueError(e.response['Error']['Message'])

    def create_course(self, course: dict):
        table = self.__db.Table(CISCOURSE_TABLE_NAME)
        response = table.put_item(Item=course)
        return response

    def update_course(self, course: dict):
        table = self.__db.Table(CISCOURSE_TABLE_NAME)
        response = table.update_item(        
            Key={'id': course.get('id')},
            UpdateExpression="""                
                set
                    parents =:parents,
                    label=:label,
                    description=:description,
                    credithours=:credithours,
                    coursesectioninformation=:coursesectioninformation,
                    sectionregistrationnotes=:sectionregistrationnotes,
                    sectioncapparea=:sectioncapparea,
                    termsoffered =:termsoffered,
            """,
            ExpressionAttributeValues={         # values defined in here will get injected to update expression
                    ':parents':course.get('parents'),
                    ':label':course.get('label'),
                    ':description':course.get('description'),
                    ':credithours':course.get('credithours'),
                    ':coursesectioninformation':course.get('coursesectioninformation'),
                    ':sectionregistrationnotes':course.get('sectionregistrationnotes'),
                    ':sectioncapparea':course.get('sectioncapparea'),
                    ':termsoffered':course.get('termsoffered'),
            },
            ReturnValues="UPDATED_NEW"          # return the newly updated data point
        )
        return response

    def delete_course(self, id: str):
        table = self.__db.Table(CISCOURSE_TABLE_NAME)      # referencing to table Recipes
        response = table.delete_item(           # delete recipe using uuid
            Key={'id': id}
        )
        return response