from rest_framework import serializers
from .models import MyUser, Appeals


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'first_name', 'last_name', 'password')


class AppealdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appeals
        fields = ('id', 'user', 'theme', 'text', 'answer')