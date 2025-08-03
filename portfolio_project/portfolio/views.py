from django.shortcuts import render, redirect
from .models import Skill, Experience, ContactSubmission
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    skills = Skill.objects.all()
    experiences = Experience.objects.all()
    return render(request, 'portfolio/index.html', {'skills': skills, 'experiences': experiences})

def about(request):
    return render(request, 'portfolio/about.html')

def resume(request):
    skills = Skill.objects.all()
    experiences = Experience.objects.all()
    return render(request, 'portfolio/resume.html', {'skills': skills, 'experiences': experiences})

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        message = request.POST.get('message')
        ContactSubmission.objects.create(
            name=name,
            address=address,
            phone=phone,
            email=email,
            message=message
        )
        messages.success(request, 'Your message has been sent!')
        return redirect('contact')
    return render(request, 'portfolio/contact.html')

@csrf_exempt
def add_skill(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        skill_name = data.get('skill')
        if skill_name:
            Skill.objects.create(name=skill_name)
            return JsonResponse({'success': True})
        return JsonResponse({'success': False, 'error': 'Skill name is required'})
    return JsonResponse({'success': False, 'error': 'Invalid request'})