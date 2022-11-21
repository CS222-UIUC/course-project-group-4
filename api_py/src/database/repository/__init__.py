from database.db import initialize_db
from database.domain.course_info import CourseInfoDomain
from database.domain.gpa import GpaDomain
from database.repository.course_info import CourseInfoRepository
from database.repository.gpa import GpaRepository
from main import resource


def write_course_to_db():
    
    course_domain = GpaDomain(GpaRepository(resource))
