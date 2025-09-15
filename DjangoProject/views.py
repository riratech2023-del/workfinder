from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, 'index.html')

@login_required
def find_job(request):
    return render(request, 'find_job.html')

@login_required
def personality_test(request):
    return render(request, 'personality_test.html')

@login_required
def personality_test_result(request):
    return render(request, 'PersonalityTest_result.html')

def resume_maker(request):
    return render(request, 'resumeMaker.html')


@csrf_exempt
def login_view(request):
    count = User.objects.count()
    context = {
        'count': count,
    }
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except Exception:
            return JsonResponse({'success': False, 'message': 'درخواست نامعتبر است.'})
        if not username or not password:
            return JsonResponse({'success': False, 'message': 'نام کاربری و رمز عبور الزامی است.'})
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            count = User.objects.count()
            return JsonResponse({'success': True, 'message': f'خوش آمدید {username}!', 'count': count})
        else:
            # Try to create user
            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'رمز عبور اشتباه است.'})
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            count = User.objects.count()
            return JsonResponse({'success': True, 'message': f'ثبت‌نام موفقیت‌آمیز بود. خوش آمدید {username}!', 'count': count})
    else:
        return render(request, 'login.html' , context)

