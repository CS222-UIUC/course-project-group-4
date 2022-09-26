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

    def __init__(self):  # constructor
        pass

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
        return f"https://raw.githubusercontent.com/{owner}/{repo}/master/{path}/{semester}{year}.csv"

    def _get_github_headers() -> dict[str, str]:
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

    # returns pydantic object
    @classmethod
    def get_gpas_pandas(self, semester: Semester, year: int):
        if semester == "wi":
            pass  # fix year issue with winter semesters
        url_to_csv = self._build_github_link(semester, str(year), **GpaFetcher._GPA)
        hdr = self._get_github_headers()

        # https://stackoverflow.com/questions/16283799/how-to-read-a-csv-file-from-a-url-with-python/62614979#62614979
        # https://datatofish.com/csv-to-json-string-python/
        data = pd.read_csv(url_to_csv)
        json_data = data.to_json()  # "./network/cache/fa2014.json"

        json_object = json.loads(json_data)
        json_string = json.dumps(json_object, indent=4)

        with open("./network/cache/temp.json", "w") as fp:
            fp.write(json_string)

    @classmethod
    def get_gpas_geek(self, semester, year):
        data = {}
        hdr = self._get_github_headers()
        url = self._get_github_link(semester, year, **self._GPA)

        req = request.Request(url, headers=hdr)
        res = request.urlopen(req)

        res_string = res.read().decode("utf-8")

        # THANK GOD: https://stackoverflow.com/questions/46591535/read-csv-file-directly-from-a-website-in-python-3
        # splitlines() was absolutely necessary
        csvReader = csv.DictReader(res_string.splitlines())

        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            # set primary key
            key = rows["CRN"]
            data[key] = rows

        print(json.dumps(data, indent=4))


# csvFilePath = r"./network/cache/fa2014.csv"
# jsonFilePath = r"./network/cache/fa2014.json"
# GpaFetcher.geeks_for_geeks(csvFilePath, jsonFilePath)


GpaFetcher.get_gpas_geek("fa", 2014)
