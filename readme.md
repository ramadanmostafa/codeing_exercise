# Fine Tune Learning coding exercise

simple django-react app to allow user to add, update and delete questions with answers

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Simple Documentation

There are 2 APIs endpoints

/api/v1/questions/ --> GET, POST,
GET will return all questions
POST will create a new question

/api/v1/questions/<int:pk>/ --> GET, PUT, PATCH, DELETE
GET will return a single question details
PUT, PATCH will update a question
DELETE will delete a question

### Installation

All the required packages are listed in requirements.txt file. I used 

```
pip install -r requirements.txt
```

I used django2.0, RESTFramework, react.js for frontend, sqlite3 for the database. I usually use postgresql or MySQL but i think sqlite3 suits this project because it's just a trial task.

## Running the tests

There are about 26 test case that provide 100% code coverage. You can run them using the command belew.

```
python manage.py test
```

### Break down into end to end tests

Actually there are a test for every single line i wrote in python. i tried to cover as much scenarios as i can.
there are some tests for views, serializers and models. i didn't use mock on testing the views because i wanted it to act like an integration test because i believe unit tests are great but not enough and this project is too small to apply this concept.
about react testing, i don't think this was required.

## Author

* **Ramadan K.Mostafa**