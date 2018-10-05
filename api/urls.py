from django.urls import path

from .views import QuestionsView, QuestionDetailsView

urlpatterns = [
    path('questions', QuestionsView.as_view(), name='questions'),
    path('questions/<int:pk>', QuestionDetailsView.as_view(), name='question_details'),
]