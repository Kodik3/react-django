from django.urls import path
from . import consumers


websocket_urlpatterns =[
    path(r'ws/chat/<int:appeal_id>/', consumers.AppealChatConsumer.as_asgi()),
]