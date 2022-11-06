import unittest

from network.gpa.gpa_service import GpaService
import sys


class test_query_gpa_information(unittest.TestCase):
    def test_query_gpa_information(self):
        print(sys.path)
        gpa_service = GpaService()
        self.assertFalse(gpa_service.query_gpa_information("CS"))
