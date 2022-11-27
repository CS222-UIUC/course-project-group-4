import boto3
from boto3.resources.base import ServiceResource
from config import config

# https://realpython.com/primer-on-python-decorators/
def once(func):
    return_val = None

    def wrapper(*args, **kwargs):
        nonlocal return_val  # references parent value, not threadsafe
        if return_val is None:
            return_val = func(*args, **kwargs)
        return return_val

    return wrapper


@once
def initialize_db() -> ServiceResource:

    return boto3.resource(
        service_name="dynamodb",
        region_name="us-east-1",
        aws_access_key_id=config.aws_access_key_id,
        aws_secret_access_key=config.aws_secret_key,
    )
