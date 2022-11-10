import unittest
from network.course_info.course_info_fetcher import Semester

from network.course_info.course_info_service import CourseInfoService


class test_query_course_info(unittest.TestCase):
    def test_query_course_info(self):
        course_info_service = CourseInfoService()
        self.assertFalse(course_info_service.term_to_db(2019, Semester.FALL))
