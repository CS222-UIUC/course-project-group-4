from database.PartiSqlWrapper import PartiQLWrapper
from database.db import initialize_db
from gpa_fetcher import GpaFetcher, Semester
from database.domain.courses import CoursesDomain
from database.repository.courses import CoursesRepository
from boto3.resources.base import ServiceResource

from network.service import AbstractService


class GpaService(AbstractService):
    # FIRST_YEAR_TO_FETCH = 2021
    SLEEP_MS = 100

    def __init__(
        self,
        dyn_res: ServiceResource = initialize_db(),
        fetcher: GpaFetcher = GpaFetcher(),
    ):
        self.fetcher = fetcher
        self.dyn_res = dyn_res

    def query_gpa_information(self, subject: str):
        parti_wrapper = PartiQLWrapper(self.dyn_res)
        query_results = parti_wrapper.run_partiql(
            f"SELECT * FROM testcourse WHERE subject =?", [subject.upper()]
        )
        return query_results["Items"]

    def term_to_db(self, year: int, semester: Semester):
        course_domain = CoursesDomain(CoursesRepository(self.dyn_res))
        gpa_info = self.fetcher.get_gpas(year, semester)
        for each in gpa_info:
            course_domain.create_course_json(each)

    def get_majors(self):
        major_table = self.__db.Table("Majors")
        response = major_table.scan()
        return response.get("Items", [])
