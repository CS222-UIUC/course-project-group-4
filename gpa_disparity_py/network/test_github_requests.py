"""Tests functions of github_requests.py"""

from github_requests import get_raw_github_links

def test_get_raw_github_links():
    """tests that the list returned by get_raw_github_links is not empty
    There's a limit of 60 requests per hour if not authenticated, else 5000"""
    links = get_raw_github_links("https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw")
    assert links #asserts that the list is not empty
