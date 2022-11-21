import unittest
from db import initialize_db
from domain.courses import CoursesDomain
from domain.courses import CoursesModel
from repository.courses import CoursesRepository
import pandas as pd

class TestCourses(unittest.TestCase):
    def test_set_mode_to_links(self):

        df = pd.read_csv("test_files/fa2014.csv", dtype=str)
        resource = initialize_db()
        course_domain = CoursesDomain(CoursesRepository(resource))
        NUM_ITEMS = 6
        test_crns = set()
        for i in range(NUM_ITEMS):
            d = dict(df.iloc[i])
            d["semester"] = "example"
            course_domain.create_course_json(d)
            test_crns.add(d["CRN"])

        self.assertTrue("AAS" in course_domain.get_all_majors())

        for crn in test_crns:
            course_domain.delete_course(crn, "example")
