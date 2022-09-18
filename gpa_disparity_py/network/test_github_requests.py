"""Tests functions of github_requests.py"""

from github_requests import get_raw_github_links, build_github_link, GPA


def test_get_raw_github_links():
    """tests that the list returned by get_raw_github_links is not empty
    There's a limit of 60 requests per hour if not authenticated, else 5000"""
    links = get_raw_github_links(
        "https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw")
    assert links  # asserts that the list is not empty


def test_build_github_link():
    """ tests that github_link_builder returns the expected url"""
    assert build_github_link(
        **GPA) == r"https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw"
