import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from auths.models import MyUser
from appeals.models import Appeal, AppealMessage


class AppealChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.appeal_id = self.scope['url_route']['kwargs']['appeal_id']
        self.room_name = f'{self.appeal_id}_chat'
        self.appeal = await sync_to_async(Appeal.objects.get)(pk=self.appeal_id)

        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()
        await self.send_all_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        text_content = data['text_content']
        user_id = data['user_id']
        # token = data['token']
        
        try:
            user = await sync_to_async(MyUser.objects.get)(pk=user_id)
        except MyUser.DoesNotExist:
            return
        
        
        message = await sync_to_async(AppealMessage.objects.create)(
            sender=user,
            appeal=self.appeal,
            content=text_content
        )

        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'chat_message',
                'text_content': text_content,
                'user_name': f'{user.first_name} {user.last_name}',
                'date_added' : message.date_added.strftime('%Y-%m-%d %H:%M:%S'),
                'is_staff' : user.is_staff
            }
        )

    async def chat_message(self, event):
        text_content = event['text_content']
        user_name = event['user_name']
        date_added = event['date_added']
        is_staff = event['is_staff']
        
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'text_content': text_content,
            'user_name': user_name,
            'date_added': date_added,
            'is_staff': is_staff
        }))

    async def send_all_messages(self):
        messages = await sync_to_async(list)(
            AppealMessage.objects.filter(appeal=self.appeal_id).values()
        )
        formatted_messages = []
        for message in messages:
            user = await sync_to_async(MyUser.objects.get)(pk=message['sender_id'])
        
            formatted_messages.append({
                'text_content': message['content'],
                'user_name': f'{user.first_name} {user.last_name}',
                'date_added': message['date_added'].strftime('%Y-%m-%d %H:%M:%S'),
                'is_staff': user.is_staff
            })

        await self.send(text_data=json.dumps(formatted_messages))
        
        



    