from database.PartiSqlWrapper import PartiQLWrapper
from database.db import initialize_db
from database.domain.course_info import CourseInfoDomain
from database.repository.course_info import CourseInfoRepository
from network.course_info.course_info_fetcher import CourseInfoFetcher, Semester
from network.service import AbstractService
from boto3.resources.base import ServiceResource


class CourseInfoService(AbstractService):
    # FIRST_YEAR_TO_FETCH = 2021
    SLEEP_MS = 100

    def __init__(
        self,
        dyn_res: ServiceResource = initialize_db(),
        fetcher: CourseInfoFetcher = CourseInfoFetcher(),
    ):
        self.fetcher = fetcher
        self.dyn_res = dyn_res

    def query_course_info(self, subject: str, number: str):
        parti_wrapper = PartiQLWrapper(self.dyn_res)
        query_results = parti_wrapper.run_partiql(
            f"SELECT * FROM course_final WHERE subject =? AND number =?",
            [subject.upper(), number],
        )
        return query_results["Items"]

    def term_to_db(self, year: int, semester: Semester):
        course_domain = CourseInfoDomain(CourseInfoRepository(self.dyn_res))
        course_info = self.fetcher.get_course_info(year, semester)
        for each in course_info:
            course_domain.create_course_info_json(each)

    def course_info_from_web(self, year: int, semester: Semester):
        self.fetcher.get_course_info(year, semester)
