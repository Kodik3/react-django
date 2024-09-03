import os
import requests as req
from datetime import datetime, timedelta
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.base')

app = Celery('settings', broker=settings.CELERY_BROKER_URL)
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.PROJECT_APPS)
app.conf.broker_connection_retry_on_startup = True

def formatted_time(date_time):
    return date_time.strftime('%Y-%m-%dT%H:%M:%S.%f') + 'Z'

def synchronize_bank_operations_with_finance_service():
    date = datetime.now()
    date_one_hour_ago = date - timedelta(hours=1)
    try:
        url = 'https://b2b.revolut.com/api/1.0/transactions?created_at={}to='.format(
            formatted_time(date_one_hour_ago),
            formatted_time(date)
        )
        operations_req = req.get(url)

        while operations_req.status_code != 200:
            operations_req = req.get(url)
            print(f'bad request url: {url}, status: {operations_req.status_code}')

        operations_data = operations_req.json()
        services_urls = [
            'http://...',
            'http://...',
            'http://...'
        ]
        for service_url in services_urls:
            service_operations_req = req.get(service_url)
            if service_operations_req.status_code != 200:
                print(
                    f'bad request url: {service_url}, status: {service_operations_req.status_code}'
                )
            finance_service_operations_data = service_operations_req.json()
            new_operations = [
                op for op in operations_data if op not in finance_service_operations_data
            ]
            req.post(
                url=f'{service_url}/...',
                json=new_operations
            )
    except Exception as e:
        print(f'[ERROR] - {e}')


app.conf.beat_schedule = {
    'add-every-15-sec': {
        'task': 'get-new-currency',
        'schedule': timedelta(seconds=15)
    },
}

app.conf.timezone = 'UTC'

