import logging
from network.course_info.course_info_fetcher import CourseInfoFetcher
from network.gpa.gpa_fetcher import GpaFetcher
from config import config
import httpx
import asyncio


async def write_gpas_to_api(gpas):
    headers = {"key": config.write_endpoint_key}

    async with httpx.AsyncClient(verify=False, timeout=60) as client:
        for course in gpas:
            r = await client.post(
                config.write_gpa_endpoint,
                json=course,
                headers=headers,
            )

            if r.status_code == 200:
                logging.info(f"Succsesfully wrote course ${course}\n")
            else:
                logging.error(f"Error code ${r.status_code} when writing ${course}\n")


async def write_course_info_to_api(course_info):
    headers = {"key": config.write_endpoint_key}

    async with httpx.AsyncClient(verify=False, timeout=60) as client:
        for course in course_info:
            r = await client.post(
                config.write_ci_endpoint,
                json=course,
                headers=headers,
            )

            if r.status_code == 200:
                logging.info(f"Succsesfully wrote course ${course}\n")
            else:
                logging.error(f"Error code ${r.status_code} when writing ${course}\n")


if __name__ == "__main__":

    logging.basicConfig(level=config.log_level.upper())

    gpa_fetcher = GpaFetcher()
    gpas = gpa_fetcher.get_gpas()
    asyncio.run(write_gpas_to_api(gpas))

    course_info_fetcher = CourseInfoFetcher()
    course_info = course_info_fetcher.get_course_info()
    asyncio.run(write_course_info_to_api(course_info))
