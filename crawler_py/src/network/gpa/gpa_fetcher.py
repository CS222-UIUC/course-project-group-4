import csv
from config import config
import requests
from network.utility import get_github_headers_json


class GpaFetcher:
    """Class used to fetch GPA information"""

    def __init__(self):
        self._GPA = {"owner": "wadefagen", "repo": "datasets", "path": "gpa/raw"}
        self.url_cleaned_data = "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv"

    def get_gpas(self):
        """Used to get GPA information

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """

        url = self.url_cleaned_data

        headers = get_github_headers_json()

        response = requests.get(url, headers=headers)

        data = self._class_csv_to_dict(response.text)

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

    def _class_csv_to_dict(self, data_source: str):
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
            if (
                row["Year"] >= config.start_year
                and row["Year"] <= config.end_year
                and row["Subject"] == config.subject_to_load
                and (row["Term"] == "Fall" or row["Term"] == "Spring")
            ):
                row["ID"] = self._build_id(row)
                data.append(row)
        return data
