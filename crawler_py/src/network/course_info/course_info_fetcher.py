import csv
from enum import Enum
import logging
import requests
from config import config

from network.utilitiy.utility import get_github_headers_json


class Semester(Enum):
    SPRING = "sp"
    FALL = "fa"


class CourseInfoFetcher:
    """Class used to fetch GPA info"""

    _GPA = {
        "owner": "wadefagen",
        "repo": "datasets",
        "path": "course-catalog/data",
    }

    def __init__(self):
        self._TIMEOUT = 500
        self._MIN_YEAR = 2016
        # self._MAX_YEAR = datetime.date.today.year
        self._MAX_YEAR = 2023

    def _get_github_link(
        self,
        semester: str,
        year: str,
        owner: str = _GPA["owner"],
        repo: str = _GPA["repo"],
        path: str = _GPA["path"],
    ) -> str:
        """given owner, repo, path, returns a string for github API GET requests
        Args: (direct from https://docs.github.com/en/rest/repos/contents)
            owner (str): The account owner of the repository. The name is not case sensitive.
            repo (str): The name of the repository. The name is not case sensitive.
            path (str): path parameter
        Returns:
            str: URL
        """

        return f"https://raw.githubusercontent.com/{owner}/{repo}/master/{path}/{year}-{semester}.csv"

    def _class_csv_to_dict(
        self,
        data_source: str,
    ):
        """Converts csv input to dictionary
        Args:
            resource (_type_): file pointer or formatted webpage
        Returns:
            _type_: _description_
        """
        data = []
        # splitlines() is necessary
        csvReader = csv.DictReader(data_source.splitlines())
        for row in csvReader:
            if row["Subject"] == config.subject_to_load:
                data.append(row)
        return data

    def get_course_info_helper(self, year, semester: Semester):
        """gets course info
        Args:
            semester (Semester): semester
            year (int): year of semester
        Returns:
            _type_: json of classes
        """
        semester_text = semester.value
        url = self._get_github_link(semester_text, year)
        headers = get_github_headers_json()
        response = requests.get(url, headers=headers, timeout=self._TIMEOUT)
        logging.info(response)
        if response.status_code != 200:
            return {}
        data = self._class_csv_to_dict(response.text)
        return data

    def get_course_info(self):
        """Gets courses from min year to max year for Spring and Fall semester

        Returns:
            _type_: _description_
        """
        course_info = []
        for year in list(range(self._MAX_YEAR, self._MIN_YEAR, -1)):
            for semester in [Semester.FALL, Semester.SPRING]:
                course_info_append = self.get_course_info_helper(year, semester)
                logging.info(f"retrieved (${year}, ${semester}): ${course_info_append}")
                course_info.extend(course_info_append)
        return course_info
