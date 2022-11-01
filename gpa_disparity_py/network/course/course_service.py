from network.service import AbstractService
import datetime


class GpaService(AbstractService):
    FIRST_YEAR_TO_FETCH = 2010
    SLEEP_MS = 100

    def validate_input(self, year, semester, subjectCode, courseNumber, crn):
        if year < 2004:
            raise ValueError("year must be > 2004 for CIS Data Explorer")

