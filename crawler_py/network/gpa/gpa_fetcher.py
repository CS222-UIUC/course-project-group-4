from enum import Enum
import csv
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

    def get_gpas(self, year, semester: Semester):
        """Used to get GPA information

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """

        # self.validate_input(semester, year)

        url = self.url_cleaned_data

        headers = self._get_github_headers_json()

        response = requests.get(url, headers=headers)

        data = self._class_csv_to_dict(year, semester, response.text)

        return data

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

        # https://stackoverflow.com/questions/46591535/read-csv-file-directly-from-a-website-in-python-3
        # splitlines() was absolutely necessary
        csvReader = csv.DictReader(data_source.splitlines())

        # Convert each row into a dictionary
        # and add it to data
        for row in csvReader:
            if str(year) == row["Year"]:
                row["ID"] = self._build_id(row)
                data.append(row)
        return data

    def get_gpas(self, year, semester: Semester):
        """Used to get GPA information

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """
        url = self.url_cleaned_data
        headers = self._get_github_headers_json()
        response = requests.get(url, headers=headers)
        data = self._class_csv_to_dict(year, semester, response.text)

        return data
