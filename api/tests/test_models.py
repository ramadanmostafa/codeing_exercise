from rest_framework.test import APITestCase

from api.models import Answer
from api.tests.helpers import QuestionsMixin


class TestQuestion(APITestCase, QuestionsMixin):

    def setUp(self):
        self.answers = [
            {'body': 'answer body1', 'feedback': 'feedback1', 'rank': 1, 'is_correct': False},
            {'body': 'answer body2', 'feedback': 'feedback2', 'rank': 2, 'is_correct': False},
            {'body': 'answer body3', 'feedback': 'feedback3', 'rank': 3, 'is_correct': True}
        ]
        self.question = self.create_question('body', True, self.answers)

    def test_answers_property_with_answers(self):
        answers_ids = self.question.answers_data.all().order_by('rank').values_list('id', flat=True)

        for i, answer in enumerate(answers_ids):
            self.answers[i]['id'] = answer
        self.assertEqual(self.answers, self.question.answers)

    def test_answers_property_no_answers(self):
        self.question.answers_data.all().delete()
        self.assertEqual([], self.question.answers)


class TestAnswer(APITestCase, QuestionsMixin):

    def setUp(self):
        self.question = self.create_question('body', True)
        self.answer_empty = Answer.objects.create(question=self.question, rank=1)
        self.answer_full = Answer.objects.create(
            question=self.question, rank=2, body='body', feedback='feedback', is_correct=True
        )

    def test_to_dict(self):
        data_empty = {
            "id": self.answer_empty.id,
            "body": '',
            "is_correct": False,
            "feedback": '',
            "rank": 1
        }
        data_full = {
            "id": self.answer_full.id,
            "body": 'body',
            "is_correct": True,
            "feedback": 'feedback',
            "rank": 2
        }
        self.assertEqual(data_empty, self.answer_empty.to_dict())
        self.assertEqual(data_full, self.answer_full.to_dict())