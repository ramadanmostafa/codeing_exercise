from django.urls import path

from .views import QuestionsView


urlpatterns = [
    path('questions', QuestionsView.as_view(), name='questions'),
]