from settings.celery import app
from decouple import config
import requests
from datetime import datetime
from currency.models import HistoryCurrencies

@app.task(name='get-new-currency')
def get_new_currency() -> None:
    API_KEY = config('API_KEY', str)
    LATEST_URL = f'https://api.freecurrencyapi.com/v1/latest?apikey={API_KEY}'
    currency_choices = HistoryCurrencies.get_choices()
    ''' add every 15 seconds  '''
    print('start')
    for currency in currency_choices:
        print('working')
        stroke_currencies = '%2C'.join([c[0] for c in currency_choices if c != currency])
        url = f'{LATEST_URL}&currencies={stroke_currencies}&base_currency={currency}'
        print('get request')
        req = requests.get(url)
        if req.status_code == 200:
            print('good status')
            data = req.json()
            for to_currency, exchange_rate in data['data'].items():
                HistoryCurrencies.objects.create(
                    from_currency = currency,
                    to_currency = to_currency,
                    exchange_rate = exchange_rate
                )
    print('end')