from django.db import models


class HistoryCurrencies(models.Model):
    class Currency(models.TextChoices):
        RUB = 'RUB'
        USD = 'USD'
        # EUR = 'EUR'

    from_currency = models.CharField(max_length=50, choices=Currency.choices)
    to_currency = models.CharField(max_length=50, choices=Currency.choices)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=3)
    date_time = models.DateTimeField(auto_now_add=True)

    @classmethod
    def get_choices(cls):
        return cls.Currency.choices
    
    class Meta:
        app_label = 'currency'
    
    def __str__(self) -> str:
        return f'{self.from_currency} to {self.to_currency} -> {self.exchange_rate}'

    
