import logging
from boto3.resources.base import ServiceResource
from database.db import initialize_db
from database.PartiSqlWrapper import PartiQLWrapper
from database.domain.course_info import CourseInfoDomain, CourseInfoModel
from database.repository.course_info import CourseInfoRepository
from network.course_info.course_info_fetcher import CourseInfoFetcher


class ApiGetService:
    def __init__(
        self,
        dyn_res: ServiceResource = initialize_db(),
    ):
        self.dyn_res = dyn_res

    def query_gpa_information(self, subject: str):
        parti_wrapper = PartiQLWrapper(self.dyn_res)
        query_results = parti_wrapper.run_partiql(
            f"SELECT * FROM gpa_final WHERE subject =?", [subject.upper()]
        )
        return query_results["Items"]

    def get_majors(self):
        major_table = self.dyn_res.Table("Majors")
        response = major_table.scan()
        formatted_results = [row["Major"] for row in response["Items"]]
        return formatted_results

    def query_course_info(self, subject: str, course_number: str) -> CourseInfoModel:
        parti_wrapper = PartiQLWrapper(self.dyn_res)
        query_results = parti_wrapper.run_partiql(
            f"SELECT * FROM course_final WHERE subject = ? AND number = ?",
            [subject, str(course_number)],
        )
        logging.info(f"retrieved from DB: ${query_results}")

        if query_results["Items"]:
            course_info_list = query_results["Items"]
            most_recent_course_info = {}
            if course_info_list:
                # https://stackoverflow.com/questions/72899/how-do-i-sort-a-list-of-dictionaries-by-a-value-of-the-dictionary
                sorted_results = sorted(
                    course_info_list, key=lambda d: d["yearterm"], reverse=True
                )
                most_recent_course_info = sorted_results[0]
            return most_recent_course_info
        else:
            logging.info("CourseInfo not in DB")
            fetcher = CourseInfoFetcher()
            course_info = fetcher.get_course_info(subject, course_number)
            if course_info:
                course_info_domain = CourseInfoDomain(
                    CourseInfoRepository(initialize_db())
                )
                course_info_model = CourseInfoModel(**course_info)
                course_info_domain.create_course_info(course_info_model)

            return course_info