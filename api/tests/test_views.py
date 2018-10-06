import json

from rest_framework.test import APITestCase
from django.urls import reverse

from api.tests.helpers import QuestionsMixin


class TestQuestionsView(APITestCase, QuestionsMixin):

    def test_get(self):
        self.create_questions(10)
        response = self.client.get(reverse('questions'))
        self.assertEqual(200, response.status_code)
        for item in response.json():
            self.assertIn('answers', item)
            self.assertIn('body', item)
            self.assertIn('id', item)
            self.assertIn('published', item)
            self.assertIn('type', item)

            self.assertEqual('Multiple Choice', item['type'])
            self.assertEqual([], item['answers'])
            self.assertFalse(item['published'])

    def test_post_empty(self):
        response = self.client.post(reverse('questions'), data={})
        self.assertEqual(400, response.status_code)
        self.assertEqual({'answers': ['This field is required.']}, response.json())

    def test_post_with_no_answers(self):
        response = self.client.post(reverse('questions'), data={'body': 'body', 'published': True, 'answers': '[]'})
        self.assertEqual(201, response.status_code)
        item = response.json()
        self.assertIn('answers', item)
        self.assertIn('body', item)
        self.assertIn('id', item)
        self.assertIn('published', item)
        self.assertIn('type', item)

        self.assertEqual('body', item['body'])
        self.assertEqual('Multiple Choice', item['type'])
        self.assertEqual([], item['answers'])
        self.assertTrue(item['published'])

    def test_post_with_one_answer(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([{'body': 'answer body', 'feedback': 'feedback', 'rank': 1, 'is_correct': False}])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(201, response.status_code)
        item = response.json()
        self.assertIn('answers', item)
        self.assertIn('body', item)
        self.assertIn('id', item)
        self.assertIn('published', item)
        self.assertIn('type', item)

        self.assertEqual('body', item['body'])
        self.assertEqual('Multiple Choice', item['type'])
        self.assertTrue(item['published'])

        self.assertEqual(1, len(item['answers']))

        self.assertIn('body', item['answers'][0])
        self.assertIn('feedback', item['answers'][0])
        self.assertIn('id', item['answers'][0])
        self.assertIn('is_correct', item['answers'][0])
        self.assertIn('rank', item['answers'][0])

        self.assertEqual('answer body', item['answers'][0]['body'])
        self.assertEqual('feedback', item['answers'][0]['feedback'])
        self.assertEqual(1, item['answers'][0]['rank'])
        self.assertFalse(item['answers'][0]['is_correct'])

    def test_post_with_one_answer_missing_rank(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([{'body': 'answer body', 'feedback': 'feedback', 'is_correct': False}])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(400, response.status_code)
        self.assertEqual({'answers': ['every answer should have body, feedback and rank']}, response.json())

    def test_post_with_one_answer_missing_body(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([{'feedback': 'feedback', 'rank': 1, 'is_correct': False}])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(400, response.status_code)
        self.assertEqual({'answers': ['every answer should have body, feedback and rank']}, response.json())

    def test_post_with_one_answer_missing_feedback(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([{'body': 'answer body', 'rank': 1, 'is_correct': False}])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(400, response.status_code)
        self.assertEqual({'answers': ['every answer should have body, feedback and rank']}, response.json())

    def test_post_with_one_answer_missing_is_correct(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([{'body': 'answer body', 'rank': 1, 'feedback': 'feedback'}])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(400, response.status_code)
        self.assertEqual({'answers': ['every answer should have body, feedback and rank']}, response.json())

    def test_post_with_three_answers(self):
        data = {
            'body': 'body',
            'published': True,
            'answers': json.dumps([
                {'body': 'answer body1', 'feedback': 'feedback1', 'rank': 1, 'is_correct': False},
                {'body': 'answer body2', 'feedback': 'feedback2', 'rank': 2, 'is_correct': False},
                {'body': 'answer body3', 'feedback': 'feedback3', 'rank': 3, 'is_correct': True}
            ])
        }
        response = self.client.post(reverse('questions'), data=data)
        self.assertEqual(201, response.status_code)
        item = response.json()
        self.assertIn('answers', item)
        self.assertIn('body', item)
        self.assertIn('id', item)
        self.assertIn('published', item)
        self.assertIn('type', item)

        self.assertEqual('body', item['body'])
        self.assertEqual('Multiple Choice', item['type'])
        self.assertTrue(item['published'])

        self.assertEqual(3, len(item['answers']))

        for i in range(3):
            self.assertIn('body', item['answers'][i])
            self.assertIn('feedback', item['answers'][i])
            self.assertIn('id', item['answers'][i])
            self.assertIn('is_correct', item['answers'][i])
            self.assertIn('rank', item['answers'][i])

            self.assertEqual('answer body{}'.format(i + 1), item['answers'][i]['body'])
            self.assertEqual('feedback{}'.format(i + 1), item['answers'][i]['feedback'])
            self.assertEqual(i + 1, item['answers'][i]['rank'])
            self.assertEqual(i == 2, item['answers'][i]['is_correct'])


class TestQuestionDetailsView(APITestCase, QuestionsMixin):
    def setUp(self):
        answers = [
            {'body': 'answer body1', 'feedback': 'feedback1', 'rank': 1, 'is_correct': False},
            {'body': 'answer body2', 'feedback': 'feedback2', 'rank': 2, 'is_correct': False},
            {'body': 'answer body3', 'feedback': 'feedback3', 'rank': 3, 'is_correct': True}
        ]
        self.question = self.create_question('body', True, answers)

    def test_get_valid(self):
        answers_ids = self.question.answers_data.all().order_by('rank').values_list('id', flat=True)
        data = {
            'answers': [
                {'body': 'answer body1', 'feedback': 'feedback1', 'id': answers_ids[0], 'is_correct': False, 'rank': 1},
                {'body': 'answer body2', 'feedback': 'feedback2', 'id': answers_ids[1], 'is_correct': False, 'rank': 2},
                {'body': 'answer body3', 'feedback': 'feedback3', 'id': answers_ids[2], 'is_correct': True, 'rank': 3}
            ],
            'body': 'body', 'id': self.question.pk, 'published': True, 'type': 'Multiple Choice'
        }
        response = self.client.get(reverse('question_details', kwargs={'pk': self.question.pk}))
        self.assertEqual(200, response.status_code)
        self.assertEqual(data, response.json())

    def test_get_invalid(self):
        response = self.client.get(reverse('question_details', kwargs={'pk': self.question.pk + 5500}))
        self.assertEqual(404, response.status_code)
        self.assertEqual({'detail': 'Not found.'}, response.json())

    def test_delete_valid(self):
        response = self.client.delete(reverse('question_details', kwargs={'pk': self.question.pk}))
        self.assertEqual(204, response.status_code)

    def test_delete_invalid(self):
        response = self.client.delete(reverse('question_details', kwargs={'pk': self.question.pk + 5500}))
        self.assertEqual(404, response.status_code)
        self.assertEqual({'detail': 'Not found.'}, response.json())

    def test_update_invalid(self):
        response = self.client.put(reverse('question_details', kwargs={'pk': self.question.pk + 5500}))
        self.assertEqual(404, response.status_code)
        self.assertEqual({'detail': 'Not found.'}, response.json())

    def test_update_valid(self):
        self.maxDiff = None
        data = {
            'answers': json.dumps([
                {'body': 'update body1', 'feedback': 'update feedback1', 'is_correct': True, 'rank': 3},
                {'body': 'update body2', 'feedback': 'update feedback2', 'is_correct': False, 'rank': 2},
                {'body': 'update body3', 'feedback': 'update feedback3', 'is_correct': False, 'rank': 1},
                {'body': 'update body4', 'feedback': 'update feedback4', 'is_correct': False, 'rank': 4}
            ]),
            'body': 'update body', 'published': False
        }
        response = self.client.put(reverse('question_details', kwargs={'pk': self.question.pk}), data=data)
        self.assertEqual(200, response.status_code)
        self.question.refresh_from_db()

        self.assertEqual('update body', self.question.body)
        self.assertFalse(self.question.published)
        self.assertEqual(4, self.question.answers_data.all().count())

        # validate answer 4
        answer = self.question.answers_data.get(rank=4)
        self.assertEqual('update body4', answer.body)
        self.assertEqual('update feedback4', answer.feedback)
        self.assertFalse(answer.is_correct)
        self.assertEqual(4, answer.rank)
