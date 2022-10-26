from db import initialize_db

resource = initialize_db()

assert resource.Table("CISCourses").table_status == "ACTIVE"