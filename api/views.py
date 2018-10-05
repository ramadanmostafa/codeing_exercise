from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Question, Answer
from .serializers import QuestionSerializer, QuestionDetailsSerializer


class QuestionsView(ListCreateAPIView):
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        pass

    def get_queryset(self):
        return Question.objects.all().order_by('id')


class QuestionDetailsView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    serializer_class = QuestionDetailsSerializer
    queryset = Question.objects.all()
