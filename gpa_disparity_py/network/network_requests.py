"""
This module is for network quests
"""

# https://stackoverflow.com/questions/23464138/downloading-and-accessing-data-from-github-python

# Parsing XML
# https://www.geeksforgeeks.org/xml-parsing-python/
# Can also use Beautiful Soup
# Pandas can also parse XML

# https://courses.illinois.edu/cisapp/

import data_sources

def github_link_builder (owner:str, repo:str, path:str) -> str:
    """given owner, repo, path, returns a string for github API GET requests

    Args: (direct from https://docs.github.com/en/rest/repos/contents)
        owner (str): The account owner of the repository. The name is not case sensitive.
        repo (str): The name of the repository. The name is not case sensitive.
        path (str): path parameter

    Returns:
        str: URL
    """
    return "https://api.github.com/repos/%s/%s/contents/%s" %(owner, repo, path)

print(github_link_builder(**data_sources.gpa))
