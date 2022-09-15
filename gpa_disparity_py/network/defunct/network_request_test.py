# from urllib import request
# import network_requests
# import data_sources
# import requests

# def test_soup():
#     """tests that get_soup does not return None"""
#     assert network_requests.get_soup(data_sources.gpa_url) is not None

# def test_source_availability():
#     """tests to make sure that each source is available"""
#     for url in data_sources.source_list:
#         page = requests.get(url)
#         assert page.status_code == 200, url+ " returned http response of "+ str(page.status_code)
