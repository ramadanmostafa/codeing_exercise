from django.test import TestCase
from rest_framework.exceptions import ValidationError

from api.models import Question
from api.serializers import QuestionSerializer


class TestQuestionSerializer(TestCase):

    def setUp(self):
        self.serializer = QuestionSerializer()

    def test_validate_with_no_answers(self):
        data = {"answers": []}
        self.assertEqual(data, self.serializer.validate(data))

    def test_validate_with_valid_answers(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': False, 'rank': 2},
            {'body': 'answer body3', 'feedback': 'feedback3', 'is_correct': True, 'rank': 3}
        ]}
        self.assertEqual(data, self.serializer.validate(data))

    def test_validate_with_answers_missing_body(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'feedback': 'feedback2', 'is_correct': False, 'rank': 2},
            {'body': 'answer body3', 'feedback': 'feedback3', 'is_correct': True, 'rank': 3}
        ]}
        with self.assertRaises(ValidationError) as context:
            self.serializer.validate(data)

        self.assertIn('every answer should have body, feedback and rank', str(context.exception))

    def test_validate_with_answers_missing_feedback(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': False, 'rank': 2},
            {'body': 'answer body3', 'is_correct': True, 'rank': 3}
        ]}
        with self.assertRaises(ValidationError) as context:
            self.serializer.validate(data)

        self.assertIn('every answer should have body, feedback and rank', str(context.exception))

    def test_validate_with_answers_missing_is_correct(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': False, 'rank': 2},
            {'body': 'answer body3', 'feedback': 'feedback3', 'rank': 3}
        ]}
        with self.assertRaises(ValidationError) as context:
            self.serializer.validate(data)

        self.assertIn('every answer should have body, feedback and rank', str(context.exception))

    def test_validate_with_answers_missing_rank(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': False, 'rank': 2},
            {'body': 'answer body3', 'feedback': 'feedback3', 'is_correct': True, }
        ]}
        with self.assertRaises(ValidationError) as context:
            self.serializer.validate(data)

        self.assertIn('every answer should have body, feedback and rank', str(context.exception))

    def test_create(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': True, 'rank': 2}],
            'body': 'q body', 'published': True
        }
        question = self.serializer.create(data)
        self.assertIsInstance(question, Question)
        self.assertEqual('q body', question.body)
        self.assertTrue(question.published)
        self.assertEqual(2, question.answers_data.all().count())

    def test_update(self):
        data = {"answers": [
            {'body': 'answer body1', 'feedback': 'feedback1', 'is_correct': False, 'rank': 1},
            {'body': 'answer body2', 'feedback': 'feedback2', 'is_correct': True, 'rank': 2}],
            'body': 'q body', 'published': True
        }
        question = self.serializer.update(Question.objects.create(), data)
        self.assertIsInstance(question, Question)
        self.assertEqual('q body', question.body)
        self.assertTrue(question.published)
        self.assertEqual(2, question.answers_data.all().count())
