"""Tests functions of github_requests.py"""

import json
import unittest
from definitions import TEST_FILE_PATH

from network.gpa.gpa_fetcher import GpaFetcher


class TestGpaFetcher(unittest.TestCase):
    def test_semester(self):
        """Tests that the semester enum outputs are as expected"""
        self.assertEqual(GpaFetcher.Semester.SPRING.value, "sp")
        self.assertEqual(GpaFetcher.Semester.SUMMER.value, "su")
        self.assertEqual(GpaFetcher.Semester.FALL.value, "fa")
        self.assertEqual(GpaFetcher.Semester.WINTER.value, "wi")

    def test_gpa_source(self):
        """tests that the data source has not been altered"""
        self.assertEqual(GpaFetcher._GPA["owner"], "wadefagen")
        self.assertEqual(GpaFetcher._GPA["repo"], "datasets")
        self.assertEqual(GpaFetcher._GPA["path"], "gpa/raw")

    def test_fix_year_winter_semester(self):
        """Tests function that converts UIUC Semester year into Wade's semester format"""
        self.assertEqual(GpaFetcher._fix_year_winter_semester(2020), "2019_2020")

    def test_get_github_link(self):
        """Tests that Github links are properly generated"""
        self.assertEqual(
            GpaFetcher._get_github_link(
                "fa", "2020", "wadefagen", "datasets", "gpa/raw"
            ),
            "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2020.csv",
        )
        self.assertEqual(
            GpaFetcher._get_github_link(
                "wi", "2020", "wadefagen", "datasets", "gpa/raw"
            ),
            "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/wi2019_2020.csv",
        )

    def test_get_github_headers_json(self):
        """Tests that github json request header is properly retruned"""
        header = GpaFetcher._get_github_headers_json()
        self.assertEqual(header["Accept"], "application/vnd.github+json")

    def test_class_csv_to_json(self):
        json_file = open(f"{TEST_FILE_PATH}/fa2014.json")
        expected = json.load(json_file)
        with open(f"{TEST_FILE_PATH}/fa2014.csv", "r") as test_file:
            actual = GpaFetcher._class_csv_to_json(test_file)
            self.assertEqual(expected, actual)
        json_file.close
