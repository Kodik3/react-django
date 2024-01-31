# Django.
from django.shortcuts import get_object_or_404
# rest_framework.
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
# models.
from .models import MyUser, Appeals
# serializers
from .serializers import UserSerializer, AppealdSerializer
# utils.
from abstracts.utils import json_response


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(req:Request) -> Response:
    serializer = UserSerializer(data=req.data)
    if serializer.is_valid():
        user = MyUser.objects.create(
            email=serializer.validated_data['email'],
            first_name=serializer.validated_data["first_name"],
            last_name=serializer.validated_data["last_name"]
        )
        user.set_password(serializer.validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return json_response(status="success", message="Пользователь успешно зарегистрирован")
    return json_response(status="error", message=serializer.errors)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(req: Request) -> Response:
    try:
        user = MyUser.objects.get(email=req.data["email"])
    except MyUser.DoesNotExist:
        return json_response(status="error", message="Пользователь с таким email не найден")
    
    if not user.check_password(req.data['password']):
        return json_response(status="error", message="Неверный пароль")
    
    token, created = Token.objects.get_or_create(user=user)
    result_data = {
        "token": token.key,
        "user": {
            "email": user.email,
            "full_name": user.full_name
        },
    }
    if user.is_staff:
        result_data["is_Admin"] = True
    return json_response(status='success', data=result_data)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_of_clients(req: Request) -> Response:
    user = req.user
    if user.is_staff:
        users_list = MyUser.objects.all()
        serializer = UserSerializer(users_list, many=True)
        return json_response(status="success", data=serializer.data)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_of_requests(req: Request) -> Response:
    user= req.user
    if user.is_staff:
        appeals_list = Appeals.objects.filter(answer__isnull=True)
        serializer = UserSerializer(appeals_list, many=True)
        return json_response(status="success", data=serializer.data)
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_info(req: Request) -> Response:
    user= req.user
    result_data = {
        "user": {
            "email": user.email,
            "full_name": user.full_name
        },
    }
    if user.is_staff:
        result_data["is_Admin"] = True
        return json_response(status="success", data=result_data)
    

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_new_appeal(req: Request) -> Response:
    user= req.user
    req.data["user"] = user.id
    serializer = AppealdSerializer(data=req.data)
    if serializer.is_valid():
        appeal = Appeals.objects.create(
            user=user,
            theme=serializer.validated_data['theme'],
            text=serializer.validated_data['text']
        )
        return json_response(status='success', message="Ваша заявка была успешна отправлена")
    return json_response(status='error', message=serializer.errors)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_user_name(req: Request) -> Response:
    user = req.user
    new_name = req.data['new_name'].split(' ')
    user.first_name = new_name[0]
    user.last_name = new_name[1]
    user.save()
    return json_response(status='success', message=f'Ваше новое имя: {user.first_name} {user.last_name}', data={"full_name":user.full_name})
    


    
    


