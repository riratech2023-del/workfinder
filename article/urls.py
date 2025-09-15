from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('', views.article_views, name='articles'),
]