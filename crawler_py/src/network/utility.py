from config import config


def get_github_headers_json() -> dict[str, str]:
    """Generates headers for Github json request

    Returns:
        _type_: dictionary of headers to use as request parameter
    """
    github_header = {"Accept": "application/vnd.github+json"}

    if config.github_access_token:
        github_header["Authorization"] = str("token " + config.github_access_token)

    return github_header
