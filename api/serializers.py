from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class QuestionDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('answers_data', "id", "published", "title", "type", "body")
