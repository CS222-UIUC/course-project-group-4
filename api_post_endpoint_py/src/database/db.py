import boto3
from boto3.resources.base import ServiceResource
import os
from config import config


def initialize_db() -> ServiceResource:
    ddb = boto3.resource(
        service_name="dynamodb",
        region_name="us-east-1",
        aws_access_key_id=config.aws_access_key_id,
        aws_secret_access_key=config.aws_secret_key,
    )

    return ddb
