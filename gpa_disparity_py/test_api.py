from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app

# https://fastapi.tiangolo.com/tutorial/testing/

client = TestClient(app)

# can mock database functions within testing environment to reduce external dependencies in future weeks.


def test_read_all_subjects():
    response = client.get("/all-subjects")
    assert response.status_code == 200
    assert response.json() == ["ECE"]


def test_read_course_information():
    response = client.get("/course-information/?subject=ECE&coursenumber=125")
    assert response.status_code == 200
    assert response.json() == {"subject": "ECE", "coursenumber": 125}


def test_read_schedule_information():
    response = client.get(
        "/schedule-information/?year=2012&semester=fall&subject=ECE&coursenumber=125&crn=12345"
    )
    assert response.status_code == 200
    assert response.json() == {
        "year": 2012,
        "semester": "fall",
        "subject_code": "ECE",
        "course_number": 125,
        "crn": 12345,
    }
