"""tests functiosn of network_requests.py """
from network_utility import CACHE_PATH, get_filename, write_to_cache

GPA = {
    'owner': 'wadefagen',
    'repo': 'datasets',
    'path': 'gpa/raw'
}


def test_get_filename():
    """ tests that get_filename is using sha256 and returns properly) """
    assert get_filename(
        "Hello World") == "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"


def test_cache_file_creation():
    """tests that the write to cache created a file"""
    write_to_cache("Hello World", b"")
    with open(CACHE_PATH + "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e", "r") as binary_file:
        assert(binary_file)


# def test_write_to_cache():
#     write_to_cache("Hello World", b"Hello World")
#     with open(CACHE_PATH + "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e", "wb") as binary_file:
#         assert(binary_file.readline == b"Hello World")
