from pydantic import BaseSettings
import dotenv


class Config(BaseSettings):
    aws_access_key_id: str = ""
    aws_secret_key: str = ""

dotenv.load_dotenv()

config: Config = Config()
