"""_summary_
This module is for network quests
"""

# https://stackoverflow.com/questions/23464138/downloading-and-accessing-data-from-github-python

# Parsing XML
# https://www.geeksforgeeks.org/xml-parsing-python/
# Can also use Beautiful Soup
# Pandas can also parse XML

# https://courses.illinois.edu/cisapp/

import pandas as pd

from bs4 import BeautifulSoup

import beautifulsoup_parsers
import data_sources
import requests


def get_soup(url: str) -> BeautifulSoup:
    """_summary_
    takes in a url and returns a soup to be parsed by BeautifulSoup
    Args:
        url (str):  url to the address to read
    """
    #https://www.crummy.com/software/BeautifulSoup/bs4/doc/#making-the-soup
    #https://www.dataquest.io/blog/web-scraping-python-using-beautiful-soup/

    page = requests.get(url)

    assert page.status_code == 200

    soup = BeautifulSoup(page.content, beautifulsoup_parsers.html)
    print("soup:\n" + soup.prettify())
    return soup

get_soup(data_sources.gpa_url)
