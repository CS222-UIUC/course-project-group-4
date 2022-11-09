from boto3.resources.base import ServiceResource
from database.PartiSqlWrapper import PartiQLWrapper
from database.db import initialize_db
from filewriter import write_to_file

class ApiService():
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
        return response.get("Items", [])

    def query_course_information(self, subject: str, course_number: str):
        parti_wrapper = PartiQLWrapper(self.dyn_res)
        query_results = parti_wrapper.run_partiql(
            f"SELECT * FROM course_final WHERE subject = ? AND number = ?", [subject, str(course_number)]
        )
        course_info_list = query_results["Items"]
        write_to_file(course_info_list)
        most_recent_course_info = {}
        if course_info_list:
            # https://stackoverflow.com/questions/72899/how-do-i-sort-a-list-of-dictionaries-by-a-value-of-the-dictionary
            sorted_results = sorted(course_info_list, key = lambda d: d['yearterm'], reverse=True)
            most_recent_course_info = sorted_results[0]
        return most_recent_course_info