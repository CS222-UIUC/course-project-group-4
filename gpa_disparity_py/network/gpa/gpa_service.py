from datetime import date
import json
from database.PartiSqlWrapper import PartiQLWrapper
from database.db import initialize_db
from filewriter import write_to_file
from network.service import AbstractService
from gpa_fetcher import GpaFetcher
from database.domain.courses import CoursesDomain
from database.domain.courses import CoursesModel
from database.repository.courses import CoursesRepository
from boto3.resources.base import ServiceResource


import boto3
from botocore.exceptions import ClientError


class GpaService(AbstractService):

    FIRST_YEAR_TO_FETCH = 2021
    SLEEP_MS = 100

    def __init__(
        self,
        dyn_res: ServiceResource = initialize_db(),
        fetcher: GpaFetcher = GpaFetcher(),
    ):
        self.fetcher = fetcher
        self.dyn_res = dyn_res

    def query_gpa_information(self, subject):
        parti_wrapper = PartiQLWrapper(self.dyn_res)

        course_domain = CoursesDomain(CoursesRepository(self.dyn_res))

        gpa_info = self.fetcher.get_gpas()

        for each in gpa_info:
            course_domain.create_course_json(each)

        # query_results = parti_wrapper.run_partiql(
        #     f"SELECT * FROM Courses WHERE subject=? AND number=?", ["CS", "125"]
        # )
