from django.db import models
from tinymce.models import HTMLField


class Question(models.Model):
    published = models.BooleanField(default=False)  # false -> draft, true -> published

    # assume we only have a multiple choice question with only one correct answer
    type = models.CharField(max_length=32, default='Multiple Choice')
    body = HTMLField()

    def save_draft(self):
        pass

    def publish(self):
        pass

    def to_dict(self):
        pass

    @property
    def answers(self):
        data = []
        for answer in self.answers_data.all():
            data.append(answer.to_dict())
        return data


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers_data', on_delete=models.CASCADE)
    body = HTMLField(default='')
    is_correct = models.BooleanField(default=False)
    feedback = HTMLField(default='')
    rank = models.IntegerField()

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "is_correct": self.is_correct,
            "feedback": self.feedback,
            "rank": self.rank,
        }

    def mark_as_correct(self):
        pass

    def rank_up(self):
        pass

    def rank_down(self):
        pass
