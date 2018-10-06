from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from .models import Question
from .serializers import QuestionSerializer


class QuestionsView(ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = (AllowAny, )
    queryset = Question.objects.all().order_by('id')


class QuestionDetailsView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = (AllowAny, )
