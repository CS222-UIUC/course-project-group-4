import pathlib

DOWNLOAD_PATH = pathlib.Path(__file__).parent.joinpath("network/downloads").resolve()
CACHE_PATH = pathlib.Path(__file__).parent.joinpath("network/cache").resolve()

print(DOWNLOAD_PATH)
