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
from os.path import exists
from pathlib import Path

import json
import requests
import hashlib

import data_sources

CACHE_PATH = "./gpa_disparity_py/network/cache/"
DOWNLOAD_PATH = "./gpa_disparity_py/network/downloads/"

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
    """Given a string (url), generate a unique filename for the URL (used for caching)

    Args:
        string (str): string input of data source (generally a URL)

    Returns:
        _type_: _description_
    """
    #https://cryptomarketpool.com/convert-a-string-to-sha256-in-python/
    filename_hash = hashlib.sha256(string.encode())
    return str(filename_hash.hexdigest())

def ensure_directory(directory: str):
    Path(directory).mkdir(parents=True, exist_ok=True)


def write_to_cache(url:str, input_bytes: bytes):
    """given a URL and input bytes, write the bytes to file.
    filename is determined by hashing url input

    Args:
        url (str): the url to be hashed for use as filename
        input_bytes (bytes): the bytes to write to file
    """
    file_name = get_filename(url)

    #https://stackoverflow.com/questions/273192/how-can-i-safely-create-a-nested-directory
    ensure_directory(CACHE_PATH)

    # https://www.geeksforgeeks.org/python-write-bytes-to-file/
    with open(CACHE_PATH + file_name, "wb") as binary_file:
        binary_file.write(input_bytes)


def get_web_page_content(url:str) -> bytes:
    """ Gets the content of a webpage.  Will create and maintian local cache of requested webpages.

    Args:
        url (str): url of webpage to get

    Returns:
        bytes: bytes of webpage response (string representation?)
    """

    file_name = get_filename(url)

    #https://www.pythontutorial.net/python-basics/python-check-if-file-exists/
    if exists(CACHE_PATH + file_name):
        file_obj = open(CACHE_PATH + file_name, "rb")
        output = file_obj.read()
        file_obj.close()
        return output #changes data from BufferedReader (from open) to bytes

    #could use requests.json, but would be harder to cache other types of webpage
    data = requests.get(
        url,
        headers={'Accept':'application/vnd.github+json'} #ensure json response
        )

    assert data.status_code == HTTPStatus.OK
    write_to_cache(url, data.content)

    return data.content


def get_raw_github_links(url:str) -> List:
    """ Given a URL, retruns a list of download urls for each project in a git repo

    Args:
        url (str): the url of the github repo

    Returns:
        List: list of downloadl links
    """
    url = github_link_builder(**data_sources.GPA)

    webpage_content = get_web_page_content(url)

    url_list = []
    github_json = json.loads(webpage_content)
    for each in github_json:
        url_list.append(each["download_url"])
    return url_list

# We might want to set this to direct to different output folders based on file type
# example: csv folder, json folder, etc.
def download_http_file(url:str):
    """Given an http file location
    (ex. https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv)
    download the file and save it into the  DOWNLOAD_PATH

    Args:
        url (str): url to the file
    """
    content = get_web_page_content(url)

    ensure_directory(DOWNLOAD_PATH)

    file_name = url[url.rfind("/")+1:] #filename = everything after last '/' character
    print("file_name: " + file_name)

    with open(DOWNLOAD_PATH+file_name, "wb") as file:
        file.write(content)


# raw_links = get_raw_github_links("https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw")
# print(raw_links)

download_http_file("https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv")