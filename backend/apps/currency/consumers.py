import json
from channels.generic.websocket import AsyncWebsocketConsumer
from currency.models import HistoryCurrencies
from asgiref.sync import sync_to_async


class CurrencyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        from_currency = self.scope['url_route']['kwargs']['from_currency']
        to_currency = self.scope['url_route']['kwargs']['to_currency']
        self.currencies = [from_currency, to_currency]

        self.room_name = f'{from_currency}_{to_currency}'

        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()
        await self.send_history()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def send_history(self):
        history = await sync_to_async(HistoryCurrencies.objects.filter)(
            from_currency=self.currencies[0],
            to_currency=self.currencies[1],
        )
        history = await sync_to_async(list)(history.order_by('date_time'))
        history_data = [{
            'from_currency': record.from_currency,
            'to_currency': record.to_currency,
            'exchange_rate': str(record.exchange_rate),
            'date_time': record.date_time.strftime('%Y-%m-%d %H:%M:%S')
        } for record in history]

        await self.send(text_data=json.dumps(history_data))

    async def currency_updates(self, event):
        await self.send(text_data=json.dumps(event))
