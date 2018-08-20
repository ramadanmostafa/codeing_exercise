# Fine Tune Learning coding exercise

simple django-react app to allow user to add, update and delete questions with answers

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Postman Documentation

I believe that the best way to document API is to attach postman collections to describe the work done.
I created one for you "cognitev-technical-task.postman_collection.json"

## Simple Documentation

There are 3 APIs endpoints

/api/register/ --> POST,
I added a required field to this endpoint (password) to be used on login.

/api/login/ --> POST, takes phone number and password, returns token

/api/status/ --> POST, takes "Authorization": "token {token}" in the
header for authentication and "status" in the body.

### Installation

All the required packages are listed in requirements.txt file. I used 

```
pip install -r requirements.txt
```

I used django2.0, RESTFramework, react.js for frontend, sqlite3 for the database. I usually use postgresql or MySQL but i think sqlite3 suits this project because it's just a trial task.

## Running the tests

There are about 25 test case that provide 100% code coverage. You can run them using the command belew.

```
python manage.py test
```

### Break down into end to end tests

Actually there are a test for every single line i wrote. i tried to cover as much scenarios as i can.
there are some tests for views, serializers, permissions and models. i didn't use mock on testing the views because i wanted it to act like an integration test because i believe unit tests are great but not enough and this project is too small to apply this concept. 

## Author

* **Ramadan K.Mostafa**