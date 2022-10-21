Joe followed this guide when setting up pydantic with dynamodb
https://medium.com/nerd-for-tech/introduction-to-fastapi-and-local-dynamodb-595c990ed0f8

To run dynamodb locally, download the docker image and run
docker run -p 8000:8000 -d amazon/dynamodb-local

Install front-end dynamno admin tools
npm install -g dynamodb-admin

**After first run, start here**
Set local variables (run every time, else must set permanently)

# For Windows:

set DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin

# For Mac/Linux:

DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin
