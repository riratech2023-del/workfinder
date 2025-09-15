from django.urls import path
from . import views

app_name = 'jobs-info'

urlpatterns = [
    path('', views.job_views, name='jobs-info'),  # <-- use job_views, not Jobs
]