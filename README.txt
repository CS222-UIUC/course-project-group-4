
We wanted students to be able to easily see aggregate GPA for courses within their major.  We wanted students to be able to easily view course details from the grading chart to be able to quickly decide if the course is right for them.  We were inspired by the visualizations done by Professor Fagen, but we wanted an easier way for students to view details of the courses they were interested in.  We wrote our program with the intention of it being able to add more majors easily. 

Technical Architecture
Professor Fagen’s GitHub Datasets -> Python Crawlers -> Python API <-> DynamoDB.  The React Front-End requests data from the Python API. 

Install Instructions:
=================
create AWS DynamoDB tables:
- course_final (PartitionKey: crn, SortKey: yearterm)
  - Index: 'subject-number-index' (PartitionKey: subject, SortKey: number)
- gpa_final (PartitionKey: id, SortKey: subject)
  - Index: 'subject-index' (PartitionKey: subject)
- Majors (PartitionKey: Majors)  
=================
API:
cd api_py/src
create and configure .env based on .env.example
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
Can then use postman to get and send requests to the routes listed in api_py/src/main.py
=================
Crawler:
cd crawler/src
create and configure .env based on .env.example
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
=================
Frontend
cd gpa_disparity_ts
npm install
npm start

Group members and their roles:
Joe – Dyanmo DB and React Specialist 
Kalika – Data Processing & React Router Specialist 
Jason – React Specialist 
Allen – Python API specialist 
