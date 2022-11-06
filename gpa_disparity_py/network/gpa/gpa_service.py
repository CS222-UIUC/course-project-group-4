from database.PartiSqlWrapper import PartiQLWrapper
from database.db import initialize_db
from filewriter import write_to_file
from gpa_fetcher import GpaFetcher, Semester
from database.domain.courses import CoursesDomain
from database.repository.courses import CoursesRepository
from boto3.resources.base import ServiceResource

from network.service import AbstractService


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
        # for year in (GpaService.FIRST_YEAR_TO_FETCH, date.today().year):
        #     for sem in Semester:
        #         gpa_info = self.fetcher.get_gpas(year, sem)

        gpa_info = self.fetcher.get_gpas(2019, Semester.FALL)
        count = 0
        for each in gpa_info:
            if count < 5:
                course_domain.create_course_json(each)
                count += 1

        # query_results = parti_wrapper.run_partiql(
        #     f"SELECT * FROM Courses WHERE line_number=? AND subject=?", ["0", "AAS"]
        # )
