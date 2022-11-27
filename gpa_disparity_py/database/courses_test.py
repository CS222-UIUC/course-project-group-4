import unittest
from db import initialize_db
from domain.courses import CoursesDomain
from domain.courses import CoursesModel
from repository.courses import CoursesRepository
import pandas as pd
import logging

# logger for additional testing
logging.basicConfig(filename="gpa_disparity_py\database\logs\initialization_run.log", format='%(asctime)s %(message)s', filemode='w')
logger = logging.getLogger()
class TestCourses(unittest.TestCase):
    def test_set_mode_to_links(self):

        df = pd.read_csv("test_files/fa2014.csv", dtype=str)
        # checking if initialize database can call properly
        try:
            resource = initialize_db()
        except:
            logger.exception("Initialize database failed")
        else:
            logger.info("Initialization ran properly")

        course_domain = CoursesDomain(CoursesRepository(resource))
        NUM_ITEMS = 6
        test_crns = set()
        for i in range(NUM_ITEMS):
            d = dict(df.iloc[i])
            d["semester"] = "example"
            course_domain.create_course_json(d)
            test_crns.add(d["CRN"])
        # checking if get majors can call properly
        try:
            self.assertTrue("AAS" in course_domain.get_all_majors())
        except:
            logger.exception("Get all majors call failed")  
        else:
            logger.info("Get_all_majors ran properly")


        for crn in test_crns:
            course_domain.delete_course(crn, "example")
