"""tests functiosn of network_requests.py """
from network_utility import get_filename

GPA = {
    'owner': 'wadefagen',
    'repo': 'datasets',
    'path': 'gpa/raw'
}




def test_get_filename():
    """ tests that get_filename is using sha256 and returns properly) """
    assert get_filename(
        "Hello World") == "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
