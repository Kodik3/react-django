# rest_framework.
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Appeal
from .serializers import AppealSerializer
from abstracts.utils import json_response


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def appeals_list_for_chat(req: Request) -> Response:
    user = req.user

    if not user.is_staff:
        appeals_list = Appeal.objects.filter(creator=user).order_by('-id')
    else:
        appeals_list = Appeal.objects.filter(is_canceled=False).order_by('-id')
        
    paginator = PageNumberPagination()
    paginator.page_size = req.GET.get('items', 6)
    paginated_appeals = paginator.paginate_queryset(appeals_list, req)

    count_pages = paginator.page.paginator.num_pages
    serializer = AppealSerializer(paginated_appeals, many=True)

    if count_pages <= 0:
        return json_response(status='error', message='заявок нет')
    
    return paginator.get_paginated_response({
        'count_pages': count_pages,
        'appeals': serializer.data
    })

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_new_appeal(req: Request) -> Response:
    user = req.user
    theme=req.data['theme']
    content=req.data['content']
    if theme.strip() == '' or content.strip() == '':
        return json_response(status='error', message='Все поля должны быть заполнены')
    Appeal.objects.create(
        creator=user,
        theme=theme,
        text=content
    )
    return json_response(status='success', message='Ваша обращение было успешно создано!')