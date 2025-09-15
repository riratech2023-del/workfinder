from django.shortcuts import render
from .models import Articles


# Create your views here.
def article_views(request):
    article = Articles.objects.all()
    context = {
        'articles': article,
    }
    return render(request , 'article_Resume.html' , context)