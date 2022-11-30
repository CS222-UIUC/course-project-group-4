from pydantic import BaseSettings
import dotenv


class Config(BaseSettings):
    write_endpoint = ""
    write_endpoint_key = ""
    github_access_token: str = ""
    subject_to_load = ""
    year_to_load = ""
    log_level: str = "WARN"


dotenv.load_dotenv()

config: Config = Config()
