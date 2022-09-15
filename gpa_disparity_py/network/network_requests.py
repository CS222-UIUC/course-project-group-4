"""
This module is for network quests
"""

# https://stackoverflow.com/questions/23464138/downloading-and-accessing-data-from-github-python

# Parsing XML
# https://www.geeksforgeeks.org/xml-parsing-python/
# Can also use Beautiful Soup
# Pandas can also parse XML

# https://courses.illinois.edu/cisapp/

from http import HTTPStatus
from tabnanny import filename_only
from typing import List

import json
import requests
import hashlib

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

def get_filename(string: str):
    """Given a string (url), generate a filename

    Args:
        string (str): string input of data source (generally a URL)

    Returns:
        _type_: _description_
    """
    #https://cryptomarketpool.com/convert-a-string-to-sha256-in-python/
    filename_hash = hashlib.sha256(string.encode())
    return str(filename_hash.hexdigest())



def write_to_file(url:str, input_bytes: bytes):
    """given a URL and input bytes, write the bytes to file.
    filename is determined by hashing text input

    Args:
        url (str): the text to be hashed for use as filename
        input_bytes (bytes): the bytes to write to file
    """
    file_name = get_filename(url)
    # https://www.geeksforgeeks.org/python-write-bytes-to-file/
    with open(file_name, "wb") as binary_file:
        binary_file.write(input_bytes)


def get_raw_github_links(url:str) -> List:
    """ Given a URL, retruns a list of download urls for each project in a git repo

    Args:
        url (str): the url of the github repo

    Returns:
        List: list of downloadl links
    """
    url = github_link_builder(**data_sources.GPA)

    data = requests.get(
        url,
        headers={'Accept':'application/vnd.github+json'} #ensure json response
        )

    assert data.status_code == HTTPStatus.OK

    write_to_file(url, data.content)

    url_list = []
    github_json = json.loads(data.content)
    for each in github_json:
        url_list.append(each["download_url"])
    return url_list

# links = get_raw_github_links("https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw")
# print(links)

