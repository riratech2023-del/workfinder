from django.shortcuts import render
from .models import Jobs


# Create your views here.
def job_views(request):
    jobs = Jobs.objects.all()
    context = {
        'jobs': jobs,
    }
    return render(request, 'jobs_info.html', context)