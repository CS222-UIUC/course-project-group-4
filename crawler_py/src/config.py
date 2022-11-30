from pydantic import BaseSettings
import dotenv
import datetime


class Config(BaseSettings):
    write_endpoint = ""
    write_endpoint_key = ""
    github_access_token: str = ""
    subject_to_load = ""
    start_year = ""
    end_year = str(datetime.date.today().year)
    log_level: str = "WARN"


dotenv.load_dotenv()

config: Config = Config()
