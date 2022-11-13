import unittest

from network.gpa.gpa_fetcher import Semester
from network.gpa.gpa_service import GpaService


class test_query_gpa_information(unittest.TestCase):
    def test_populate_db(self):
        gpa_service = GpaService()
        self.assertTrue(gpa_service.term_to_db(2021, Semester.FALL))
