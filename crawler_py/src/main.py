import logging
from network.gpa.gpa_fetcher import GpaFetcher
from config import config
import httpx
import asyncio


async def write_gpas_to_api(gpas):
    headers = {"key": config.write_endpoint_key}

    async with httpx.AsyncClient() as client:
        for course in gpas:
            r = await client.post(
                config.write_endpoint,
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
