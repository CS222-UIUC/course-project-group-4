"""Tests functions of github_requests.py"""

import os
import unittest

from github_requests import get_raw_github_links, build_github_link, GPA, get_github_headers


class TestGithubRequests(unittest.TestCase):

    def test_get_raw_github_links(self):
        """tests that the list returned by get_raw_github_links is not empty
        There's a limit of 60 requests per hour if not authenticated, else 5000"""
        links = get_raw_github_links(
            "https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw")
        assert links  # asserts that the list is not empty

    def test_build_github_link(self):
        """ tests that github_link_builder returns the expected url"""
        assert build_github_link(
            **GPA) == r"https://api.github.com/repos/wadefagen/datasets/contents/gpa/raw"

    def test_get_github_headers_json(self):
        """tests that github generates the proper headers"""
        header = get_github_headers()
        assert header['Accept'] == 'application/vnd.github+json'

    def test_get_github_headers_authoriztaion(self):
        """tests that function includes github authorization if available"""
        header = get_github_headers()
        if os.environ.get('GITHUB_PAT'):
            assert header["Authorization"] == "token " + \
                os.environ.get('GITHUB_PAT')
        assert True
