from django.urls import path
from . import views

urlpatterns = [
    path('list_for_chat/', views.appeals_list_for_chat),
    path('create_new_appeal/', views.create_new_appeal),
]