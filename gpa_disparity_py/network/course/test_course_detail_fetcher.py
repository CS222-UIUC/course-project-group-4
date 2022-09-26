"""tests functiosn of network_requests.py """

# pylint: disable=wildcard-import
# pylint: disable=unused-wildcard-import

from logging import RootLogger
import os
import pytest
from network_utility import *

GPA = {"owner": "wadefagen", "repo": "datasets", "path": "gpa/raw"}
TEST_CACHE_PATH = "./network/cache/"
TEST_DOWNLOAD_PATH = "./network/downloads/"


# https://stackoverflow.com/questions/22627659/run-code-before-and-after-each-test-in-py-test


# @pytest.fixture(autouse=True)
# def before_each():
#     """runs before each test"""
#     os.chdir("../")
#     yield


def test_get_filename():
    """ tests that get_filename is using sha256 and returns properly) """
    assert (
        get_cache_filename("Hello World")
        == "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
    )


def test_cache_file_creation():
    """tests that the write to cache created a file"""
    write_to_cache("Hello World", b"")
    with open(
        TEST_CACHE_PATH + "a591a6d40bf420404a011733cfb7b190"
        "d62c65bf0bcda32b57b277d9ad9f146e",
        "r",
    ) as binary_file:
        assert binary_file


def test_write_read_cache():
    """Tests writing to cache and reading from cache"""
    with open(
        TEST_CACHE_PATH + "a591a6d40bf420404a011733cfb7b190d62c65b"
        "f0bcda32b57b277d9ad9f146e",
        "wb",
    ) as binary_file:
        write_to_cache("Hello World", b"Hello World")
    with open(
        TEST_CACHE_PATH + "a591a6d40bf420404a011733cfb7b19"
        "0d62c65bf0bcda32b57b277d9ad9f146e",
        "r",
    ) as binary_file:
        assert binary_file.readline() == "Hello World"
        assert not binary_file.readline()  # assert end of file


def test_get_web_page_not_in_cache():
    """Confirms that get_web_page_contents behaves properly when page is not in cache
    I could probably mock a server and web response,
    but it's probably just better to ensure that it returns *something*
    """
    test_web_page = "https://www.google.com"
    name = get_cache_filename(test_web_page)
    path = TEST_CACHE_PATH + name

    # https://www.w3schools.com/Python/python_file_remove.asp
    if os.path.exists(path):
        os.remove(path)

    assert get_web_page_content(test_web_page)


def test_get_download_filename():
    """tests getting the filename from http links"""
    filename = get_download_filename(
        "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv"
    )
    assert filename == "fa2010.csv"


def test_download_http_file():
    """Tests downloading files from http links"""
    test_file_url = (
        "https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv"
    )
    download_http_file(test_file_url)
    path = DOWNLOAD_PATH + get_download_filename(test_file_url)

    if os.path.exists(path):
        os.remove(path)

    download_http_file(test_file_url)

    assert os.path.exists(path)
    assert os.path.getsize(path) != 0


print("Hello World")
