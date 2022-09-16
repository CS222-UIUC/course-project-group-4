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

import data_sources
from network_utility import github_link_builder, get_web_page_content


def get_raw_github_links(url:str) -> List:
    """ Given a URL, retruns a list of download urls for each project in a git repo

    Args:
        url (str): the url of the github repo

    Returns:
        List: list of download links
    """
    url = github_link_builder(**data_sources.GPA)

    webpage_content = get_web_page_content(url)

    url_list = []
    github_json = json.loads(webpage_content)
    for each in github_json:
        url_list.append(each["download_url"])
    return url_list

