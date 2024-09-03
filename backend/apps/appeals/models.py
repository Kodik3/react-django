from django.db import models
from auths.models import MyUser


class Appeal(models.Model):
    creator = models.ForeignKey(to=MyUser, verbose_name='создатель', on_delete=models.CASCADE)
    theme = models.CharField(verbose_name='тема', max_length=150, unique=True)
    text = models.TextField(verbose_name='текст', unique=True, max_length=2000)
    date_of_creation = models.DateField(auto_now_add=True)
    is_canceled = models.BooleanField(default=False)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self) -> str:
        return f'{self.pk}. {self.theme}'
    

class AppealMessage(models.Model):
    sender = models.ForeignKey(to=MyUser, verbose_name='отправитель', on_delete=models.CASCADE)
    appeal = models.ForeignKey(to=Appeal, verbose_name='заявка', on_delete=models.CASCADE, default=None)
    content = models.TextField(verbose_name='содержание')
    image = models.ImageField(verbose_name='изображение', upload_to=f'media/messages', null=True, blank=True)
    date_added = models.DateTimeField(verbose_name='дата отправления', auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        