"""
This module is for network quests
"""

# https://stackoverflow.com/questions/23464138/downloading-and-accessing-data-from-github-python

# Parsing XML
# https://www.geeksforgeeks.org/xml-parsing-python/
# Can also use Beautiful Soup
# Pandas can also parse XML

# https://courses.illinois.edu/cisapp/


import json
from typing import List

import os
from network_utility import get_web_page_content


def get_github_headers() -> dict[str, str]:
    """Generates headers for Github json request

    Returns:
        _type_: dictionary of headers to use as request parameter
    """
    # ensure json response
    github_header = {'Accept': 'application/vnd.github+json'}

    if os.environ.get('GITHUB_PAT'):
        github_header['Authorization'] = str(
            'token ' + os.environ.get('GITHUB_PAT'))

    return github_header


def get_raw_github_links(url: str) -> List:
    """
    Given a Github API repo url, retruns a list of "download_url" for each project in the repo.
    Use github_link_builder in network_utility.py to generate links
    example url generation: github_link_builder(**data_sources.GPA)

    Args:
        url (str): the url of the github repo

    Returns:
        List: list of download links
    """

    webpage_content = get_web_page_content(url)

    url_list = []
    github_json = json.loads(webpage_content)
    for each in github_json:
        url_list.append(each["download_url"])
    return url_list
