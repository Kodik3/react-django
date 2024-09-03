from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from currency.models import HistoryCurrencies


@receiver(post_save, sender=HistoryCurrencies)
async def send_currency_update(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    chat_name = f'{instance.from_currency}_{instance.to_currency}'

    await channel_layer.group_send(
        chat_name,
        {
            'type': 'currency_updates',
            'from_currency': instance.from_currency,
            'to_currency': instance.to_currency,
            'exchange_rate': str(instance.exchange_rate),
            'date_time': instance.date_time.strftime('%Y-%m-%d %H:%M:%S')
        }
    )