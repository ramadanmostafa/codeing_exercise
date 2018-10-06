from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.JSONField(required=True)

    class Meta:
        model = Question
        fields = ('answers', "id", "published", "type", "body")

    def validate(self, attrs):
        for answer in attrs['answers']:
            if 'body' in answer and 'feedback' in answer and 'rank' in answer and 'is_correct' in answer:
                pass
            else:
                raise ValidationError({"answers": "every answer should have body, feedback and rank"})
        return attrs

    def create(self, validated_data):
        body, published = '', False
        if 'body' in validated_data:
            body = validated_data['body']
        if 'published' in validated_data:
            published = validated_data['published']
        question = Question.objects.create(
            body=body, published=published
        )
        for answer in validated_data['answers']:
            Answer.objects.create(
                body=answer['body'],
                feedback=answer['feedback'],
                rank=answer['rank'],
                is_correct=answer['is_correct'],
                question=question
            )
        return question

    def update(self, instance, validated_data):
        if 'body' in validated_data:
            instance.body = validated_data['body']
        if 'published' in validated_data:
            instance.published = validated_data['published']
        instance.save()
        instance.answers_data.all().delete()

        for answer in validated_data['answers']:
            Answer.objects.create(
                body=answer['body'],
                feedback=answer['feedback'],
                rank=answer['rank'],
                is_correct=answer['is_correct'],
                question=instance
            )
        return instance
