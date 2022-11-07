import io
import os
from enum import Enum
from textwrap import indent
import pandas as pd
import json
import csv
from urllib import request
from config import config
import requests


class Semester(Enum):
    SPRING = "sp"
    SUMMER = "su"
    FALL = "fa"
    WINTER = "wi"


class GpaFetcher:
    """Class used to fetch GPA information"""

    def __init__(self):
        self._GPA = {"owner": "wadefagen", "repo": "datasets", "path": "gpa/raw"}
        self.url_cleaned_data = "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv"

    def _fix_year_winter_semester(self, year) -> str:
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
        self, semester: str, year: str, owner: str, repo: str, path: str
    ) -> str:
        """given owner, repo, path, returns a string for github API GET requests

        Args: (direct from https://docs.github.com/en/rest/repos/contents)
            owner (str): The account owner of the repository. The name is not case sensitive.
            repo (str): The name of the repository. The name is not case sensitive.
            path (str): path parameter

        Returns:
            str: URL
        """

        if semester == Semester.WINTER.value:
            year = self._fix_year_winter_semester(year)

        return f"https://raw.githubusercontent.com/{owner}/{repo}/master/{path}/{semester}{year}.csv"

    def _get_github_headers_json(self) -> dict[str, str]:
        """Generates headers for Github json request

        Returns:
            _type_: dictionary of headers to use as request parameter
        """
        # ensure json response
        github_header = {"Accept": "application/vnd.github+json"}

        if config.github_access_token:
            github_header["Authorization"] = str("token " + config.github_access_token)

        return github_header

    def _build_id(self, row) -> str:
        properties = [
            "Year",
            "Term",
            "Subject",
            "Number",
            "A+",
            "A",
            "A-",
            "B+",
            "B",
            "B-",
            "C+",
            "C",
            "C-",
            "D+",
            "D",
            "D-",
            "F",
            "W",
        ]
        id = str()
        for property in properties:
            id += str(row[property])

        return id

    def _class_csv_to_dict(self, year, semester: Semester, data_source: str):
        """Converts csv input to dictionary

        Args:
            resource (_type_): file pointer or formatted webpage

        Returns:
            _type_: _description_
        """
        data = []

        # THANK GOD: https://stackoverflow.com/questions/46591535/read-csv-file-directly-from-a-website-in-python-3
        # splitlines() was absolutely necessary
        csvReader = csv.DictReader(data_source.splitlines())

        # Convert each row into a dictionary
        # and add it to data
        for row in csvReader:
            if str(year) == row["Year"]:
                if row["Subject"] == "CS":
                    row["ID"] = self._build_id(row)
                    data.append(row)
        return data

    # def validate_input(self, semester, year):
    #     self.Semester(semester)
    def get_gpas(self, year, semester: Semester):
        """Used to get GPA information

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """

        # self.validate_input(semester, year)

        semester_text = semester.value
        url = self.url_cleaned_data

        headers = self._get_github_headers_json()

        response = requests.get(url, headers=headers)

        data = self._class_csv_to_dict(year, semester, response.text)

        return data
