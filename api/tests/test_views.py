from rest_framework.test import APITestCase
from django.urls import reverse

from ..models import Question


class TestQuestionsView(APITestCase):

    def setUp(self):
        self.data = []
        for i in range(10):
            question_dict = dict(
                published=i % 2 == 0,
                title='title{}'.format(i),
                body='body{}'.format(i),
                type='Multiple Choice'
            )
            q = Question.objects.create(
                published=question_dict['published'],
                title=question_dict['title'],
                body=question_dict['body']
            )
            question_dict['id'] = q.pk
            self.data.append(question_dict)

    def test_get(self):
        response = self.client.get(reverse('questions'))
        self.assertEqual(200, response.status_code)
        self.maxDiff = None
        self.assertEqual(self.data, response.json())