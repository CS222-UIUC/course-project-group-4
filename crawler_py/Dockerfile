From python:3.9-slim-bullseye

WORKDIR /src

ADD src/requirements.txt /src/requirements.txt

RUN pip install --upgrade setuptools && pip install -r requirements.txt

ADD src /src

ENV PORT=8080

CMD ["python", "./main.py"]