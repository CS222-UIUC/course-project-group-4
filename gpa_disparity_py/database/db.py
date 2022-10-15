import boto3
from boto3.resources.base import ServiceResource
import os

def initialize_db() -> ServiceResource:
    ddb = boto3.resource(service_name = 'dynamodb',region_name = 'us-east-1',
              aws_access_key_id = os.environ["AWSAccessKeyId_CS222"],
              aws_secret_access_key = os.environ["AWSSecretKey_CS222"])

    return ddb