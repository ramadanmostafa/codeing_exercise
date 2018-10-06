from api.models import Question, Answer


class QuestionsMixin(object):
    def create_question(self, body, published=False, answers=list([])):
        question = Question.objects.create(published=published, body=body)
        for answer in answers:
            Answer.objects.create(
                body=answer['body'], feedback=answer['feedback'], rank=answer['rank'], question=question,
                is_correct=answer['is_correct']
            )
        return question

    def create_questions(self, count):
        for i in range(count):
            self.create_question(body='body{}'.format(i))
