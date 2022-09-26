import requests
from urllib.parse import urlencode


class ApiPathConfig:
    """Class used for configuring API request path fields"""

    def __init__(self, year=None, semester=None, subject_code=None, course_number=None, crn=None):
        self.year = year
        self.semester = semester
        self.subject_code = subject_code
        self.course_number = course_number
        self.crn = crn


def set_mode_to_links(query_params: dict):
    """changes the mode of the API query parameter to "links"

    Args:
        query_params (dict): the query parameters dictionary to be passed to
                             http://courses.illinois.edu/cisapp/explorer
    """
    query_params["mode"] = "links"


def build_illinois_link(api_path_config: ApiPathConfig, query_params: dict) -> str:
    """ Build API links for http://courses.illinois.edu/cisapp/explorer.
        Can poll schedule / course info.
        See documentation https://courses.illinois.edu/cisdocs/explorer
    Args:
        api_path_config (ApiPathConfig): class used to configure the API request
        query_params (dict): the query parameters dictionary ()

    Returns:
        str: URL for the API requests
    """
    base_url = "http://courses.illinois.edu/cisapp/explorer/schedule"
    # year=None, semester=None, subject_code=None, course_number=None, crn=None

    path_parts = [
        api_path_config.year,
        api_path_config.semester,
        api_path_config.subject_code,
        api_path_config.course_number,
        api_path_config.crn
    ]

    for part in path_parts:
        if part:
            base_url += f"/{part}"
        else:
            break

    base_url += ".xml"

    query = urlencode(query_params)

    base_url += f"?{query}"

    return base_url

# TODO - make network operations async


def send_api_request():
    """_summary_
    """
    example_config = ApiPathConfig(
        year=2021, semester='fall', subject_code='cs', course_number='225')
    query_params = {}
    set_mode_to_links(query_params)
    url = build_illinois_link(example_config, query_params)
    data = requests.get(url)
    print(data.status_code)
    print(data.content)
