import boto3
from GPA import GPA
from config import config


class dynamo_helper:
    def __init__(self) -> None:
        self.dynamo_client = boto3.resource(
            service_name="dynamodb",
            region_name="us-east-1",
            aws_access_key_id=config.aws_access_key_id,
            aws_secret_access_key=config.aws_secret_key,
        )

    def get_table(self, table_name: str):
        table = self.dynamo_client.Table(table_name)
        return table

    def GPA_insert(self, item: GPA):
        gpa_table = self.get_table("GPA")
        gpa_table.put_item(Item={"CRN": item.CRN, "semester": item.semester})
