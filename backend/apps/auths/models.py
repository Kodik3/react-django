from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError


class CastomUserManager(BaseUserManager):
    def create_user(self, email: str, password:str=None, **kwargs):
        if not email:
            raise ValidationError('Требуется электронная почта')
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password:str=None, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        return self.create_user(email, password, **kwargs)


class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='почта/логин', max_length=200, unique=True)
    first_name = models.CharField(verbose_name='имя', max_length=50)
    last_name = models.CharField(verbose_name='фамилия', max_length=60)
    password = models.CharField(verbose_name='пароль', max_length=60)
    is_staff = models.BooleanField(default=False)

    objects = CastomUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return self.email
    

class Appeals(models.Model):
    user = models.ForeignKey(to=MyUser, verbose_name='пользователь', on_delete=models.CASCADE)
    theme = models.CharField(verbose_name='тема', max_length=100, unique=True)
    text = models.TextField(verbose_name='текст', unique=True)
    answer = models.TextField(verbose_name='ответ', null=True, blank=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self) -> str:
        return self.theme

