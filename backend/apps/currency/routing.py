from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path(r'ws/currency/<str:from_currency>_<str:to_currency>/', consumers.CurrencyConsumer.as_asgi())
]