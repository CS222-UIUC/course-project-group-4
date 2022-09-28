import os
from enum import Enum
from textwrap import indent
import pandas as pd
import json
import csv
from urllib import request

# TODO look into tomorrow
# https://thekevinwang.com/2021/04/11/csv-to-dynamodb/


# https://stackoverflow.com/questions/23464138/downloading-and-accessing-data-from-github-python

# Parsing XML
# https://www.geeksforgeeks.org/xml-parsing-python/
# Can also use Beautiful Soup
# Pandas can also parse XML

# https://courses.illinois.edu/cisapp/


class GpaFetcher:
    """Class used to fetch GPA information"""

    class Semester(Enum):
        SPRING = "sp"
        SUMMER = "su"
        FALL = "fa"
        WINTER = "wi"

    _GPA = {"owner": "wadefagen", "repo": "datasets", "path": "gpa/raw"}

    # def __init__(self):  # constructor
    #     pass

    def _fix_year_winter_semester(year) -> str:
        """Wade has an odd way of specifying semester.
        If UIUC's API (source of truth) lists it winter 2021,
        Wade lists it as wi2020-2021

        Args:
            year (_type_): _description_

        Returns:
            str: _description_
        """
        if type(year) != type(int):
            year = int(year)
        return f"{year-1}_{year}"

    def _get_github_link(
        semester: str, year: str, owner: str, repo: str, path: str
    ) -> str:
        """given owner, repo, path, returns a string for github API GET requests

        Args: (direct from https://docs.github.com/en/rest/repos/contents)
            owner (str): The account owner of the repository. The name is not case sensitive.
            repo (str): The name of the repository. The name is not case sensitive.
            path (str): path parameter

        Returns:
            str: URL
        """

        if semester == GpaFetcher.Semester.WINTER.value:
            year = GpaFetcher._fix_year_winter_semester(year)

        return f"https://raw.githubusercontent.com/{owner}/{repo}/master/{path}/{semester}{year}.csv"

    def _get_github_headers_json() -> dict[str, str]:
        """Generates headers for Github json request

        Returns:
            _type_: dictionary of headers to use as request parameter
        """
        # ensure json response
        github_header = {"Accept": "application/vnd.github+json"}

        if os.environ.get("GITHUB_PAT"):
            github_header["Authorization"] = str(
                "token " + os.environ.get("GITHUB_PAT")
            )

        return github_header

    def _get_webpage(url: str, header: dict):
        """Fetches webpage and formats for use in _class_csv_to_json function

        Args:
            url (str): url to webpage
                ex. https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv
            header (dict): json dictionary

        Returns:
            _type_: _description_
        """
        web_request = request.Request(url, headers=header)
        resource = request.urlopen(web_request)

        return resource

    def _format_webpage(resource):
        # processes resource for use in _class_csv_to_json
        resource = resource.read().decode("utf-8-sig")
        resource = resource.splitlines()
        return resource

    def _class_csv_to_json(data_source):
        """Converts csv input to json

        Args:
            resource (_type_): file pointer or formatted webpage

        Returns:
            _type_: _description_
        """
        data = {}

        # THANK GOD: https://stackoverflow.com/questions/46591535/read-csv-file-directly-from-a-website-in-python-3
        # splitlines() was absolutely necessary
        csvReader = csv.DictReader(data_source)

        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            # set primary key
            key = rows["CRN"]
            data[key] = rows

        return data

    @classmethod
    def get_gpas(self, semester, year):
        """Given a semester and year, return information about classes for the year

        Args:
            semester (GpaFetcher.Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """
        semester_text = semester.value

        url = self._get_github_link(semester_text, year, **self._GPA)
        headers = self._get_github_headers_json()

        resource = GpaFetcher._get_webpage(url, headers)
        formatted_resource = GpaFetcher._format_webpage(resource)

        data = GpaFetcher._class_csv_to_json(formatted_resource)
        return data
