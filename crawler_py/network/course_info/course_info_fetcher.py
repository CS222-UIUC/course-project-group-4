import csv
from enum import Enum
from config import config
import requests


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


    def _class_csv_to_dict(self, year, semester: Semester, data_source: str):
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
            if row["Subject"] == "ECE":
                data.append(row)
        return data

    def get_course_info(self, year, semester: Semester):
        """gets course info

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """

        semester_text = semester.value
        url = self._get_github_link(semester_text, year)

        headers = self._get_github_headers_json()

        response = requests.get(url, headers=headers)

        data = self._class_csv_to_dict(year, semester, response.text)

        return data
