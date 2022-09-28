"""Tests functions of github_requests.py"""

import unittest

from network.gpa.gpa_fetcher import GpaFetcher


# class TestGpaFetcher(unittest.TestCase):
# if using class, each  test should have (self) as a parameter
# ex: def test_semester(self):


def test_semester():
    """Tests that the semester enum outputs are as expected"""
    assert GpaFetcher.Semester.SPRING.value == "sp"
    assert GpaFetcher.Semester.SUMMER.value == "su"
    assert GpaFetcher.Semester.FALL.value == "fa"
    assert GpaFetcher.Semester.WINTER.value == "wi"


def test_gpa_source():
    """tests that the data source has not been altered"""
    assert GpaFetcher._GPA["owner"] == "wadefagen"
    assert GpaFetcher._GPA["repo"] == "datasets"
    assert GpaFetcher._GPA["path"] == "gpa/raw"


def test_fix_year_winter_semester():
    """Tests function that converts UIUC Semester year into Wade's semester format"""
    assert GpaFetcher._fix_year_winter_semester(2020) == "2019_2020"


def test_get_github_link():
    """Tests that Github links are properly generated"""
    assert (
        GpaFetcher._get_github_link("fa", "2020", "wadefagen", "datasets", "gpa/raw")
        == "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2020.csv"
    )
    assert (
        GpaFetcher._get_github_link("wi", "2020", "wadefagen", "datasets", "gpa/raw")
        == "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/wi2019_2020.csv"
    )


def test_get_github_headers_json():
    """Tests that github json request header is properly retruned"""
    header = GpaFetcher._get_github_headers_json()
    assert header["Accept"] == "application/vnd.github+json"
