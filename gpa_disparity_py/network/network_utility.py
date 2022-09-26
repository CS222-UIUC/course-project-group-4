# TODO replace custom caching with https://requests-cache.readthedocs.io/en/stable/

"""Utilities related to network requests    """

from http import HTTPStatus
from os.path import exists
from pathlib import Path
from typing import Type, Union

import hashlib
import requests

CACHE_PATH = "./gpa_disparity_py/network/cache/"
DOWNLOAD_PATH = "./gpa_disparity_py/network/downloads/"

# interface Cache():
#     def get_cache_filename(string: str):
#     def ensure_directory(directory: str):
#     def write_to_cache(url: str, input_bytes: bytes):
#         raise NotImplemented


class cache:
    def get_cache_filename(string: str):
        """Given a string (url), generate a unique filename for the URL (used for caching)

        Args:
            string (str): string input of data source (generally a URL)

        Returns:
            _type_: filename as a string
        """
        # https://cryptomarketpool.com/convert-a-string-to-sha256-in-python/
        filename_hash = hashlib.sha256(string.encode())
        return str(filename_hash.hexdigest())

    def ensure_directory(directory: str):
        """Creates directory if it does not exist

        Args:
            directory (str): the directory to ensure exists
        """
        Path(directory).mkdir(parents=True, exist_ok=True)

    def write_to_cache(url: str, input_bytes: bytes):
        """given a URL and input bytes, write the bytes to file.
        filename is determined by hashing url input

        Args:
            url (str): the url to be hashed for use as filename
            input_bytes (bytes): the bytes to write to file
        """
        file_name = get_cache_filename(url)

        # https://stackoverflow.com/questions/273192/how-can-i-safely-create-a-nested-directory
        ensure_directory(CACHE_PATH)

        # https://www.geeksforgeeks.org/python-write-bytes-to-file/
        with open(CACHE_PATH + file_name, "wb") as binary_file:
            binary_file.write(input_bytes)

    def get_page_from_cache(url: str):
        """Gets page from cache

        Args:
            url (str): URL off page

        Returns:
            _type_: None if not in cache, else webpage contents
        """
        # TODO rework this into using database for local cache rather than file-based caching
        file_name = get_cache_filename(url)

        # https://www.pythontutorial.net/python-basics/python-check-if-file-exists/
        if exists(CACHE_PATH + file_name):
            file_obj = open(CACHE_PATH + file_name, "rb")
            output = file_obj.read()
            file_obj.close()
            return output  # changes data from BufferedReader (from open) to bytes

    # https://stackoverflow.com/questions/33945261/how-to-specify-multiple-return-types-using-type-hints

    def get_web_page_content(url: str, header: Union[dict, Type[None]] = None) -> bytes:
        """ Gets the content of a webpage.  Will create and maintian local cache of requested webpages.

        Args:
            url (str): url of webpage to get

        Returns:
            bytes: bytes of webpage response (string representation?)
        """

        cached_page = get_page_from_cache(url)

        if cached_page:
            return cached_page

        data = None

        data = requests.get(url, header)

        assert data.status_code == HTTPStatus.OK
        write_to_cache(url, data.content)

        return data.content

    def get_download_filename(url: str) -> str:
        """given an http file address, retrn a filename

        Args:
            url (str): url file location

        Returns:
            str: the name of the file
        """
        # filename = everything after last '/' character
        return url[url.rfind("/") + 1 :]

    # We might want to set this to direct to different output folders based on file type
    # example: csv folder, json folder, etc.

    def download_http_file(url: str):
        """Given an http file location
        (ex. https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/fa2010.csv)
        download the file and save it into the  DOWNLOAD_PATH

        Args:
            url (str): url to the file
        """
        content = get_web_page_content(url)  #fetcher class

        ensure_directory(DOWNLOAD_PATH) #

        file_name = get_download_filename(url)

        with open(DOWNLOAD_PATH + file_name, "wb") as file:
            file.write(content)
