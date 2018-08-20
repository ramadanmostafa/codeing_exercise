from django.db import models
from tinymce.models import HTMLField


class Question(models.Model):
    published = models.BooleanField(default=False)  # false -> draft, true -> published
    title = models.CharField(max_length=512)

    # assume we only have a multiple choice question with only one correct answer
    type = models.CharField(max_length=32, default='Multiple Choice')
    body = HTMLField()

    def save_draft(self):
        pass

    def publish(self):
        pass

    def to_dict(self):
        pass


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    body = HTMLField()
    is_correct = models.BooleanField(default=False)
    feedback = HTMLField()
    rank = models.CharField(max_length=1)

    def mark_as_correct(self):
        pass

    def rank_up(self):
        pass

    def rank_down(self):
        pass
