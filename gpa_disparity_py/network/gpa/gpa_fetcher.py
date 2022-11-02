import csv
from config import config
import requests

from filewriter import write_to_file


class GpaFetcher:
    """Class used to fetch GPA information"""

    def __init__(self):
        self.url_compiled_data = "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv"

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

        for row in csvReader:
            data.append(row)

        write_to_file(row)
        return data

    def get_gpas(self):
        """return information about classes for the year

        Args:
            semester (Semester): semester
            year (int): year of semester

        Returns:
            _type_: json of classes
        """

        url = self.url_compiled_data

        headers = self._get_github_headers_json()

        response = requests.get(url, headers=headers)

        data = self._class_csv_to_dict(response.text)
        return data
