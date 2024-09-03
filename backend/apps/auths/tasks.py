from settings.celery import app
from django.conf import settings
from urllib.parse import quote
from urllib.parse import quote, urljoin
# Django.
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse
# utils
from abstracts.utils import send_email
# models.
from .models import MyUser


@app.task
def account_verification(user_id: int) -> None:
    user = MyUser.objects.get(pk=user_id)
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # Кодирование uid и token перед использованием в URL
    uid_encoded = quote(uid)
    token_encoded = quote(token)

    base_url = settings.BASE_URL
    verification_url = reverse('email_verification', args=[uid_encoded, token_encoded])
    absolute_url = urljoin(base_url, verification_url)

    header = 'Подтверждение учетной записи'
    message = f"""
        <div id="message">
            <p>
                Пожалуйста, подтвердите свою учетную запись, перейдя по ссылке: 
                <a href="{absolute_url}">Подтвердить учетную запись</a>
            </p>
        </div>
    """
    send_email(header, message, [user.email], True)
