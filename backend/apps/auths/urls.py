from django.urls import path
from . import views


urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    
    path('list_of_clients/', views.list_of_clients, name='list_of_clients'),
    path('list_of_requests/', views.list_of_requests, name='list_of_requests'),
    path('create_new_appeal/', views.create_new_appeal, name='create_new_appeal'),

    path('change_user_name/', views.change_user_name, name='change_user_name')
]
