from django.contrib import admin
from . import models


@admin.register(models.Appeal)
class AppealAdmin(admin.ModelAdmin):
    ...


@admin.register(models.AppealMessage)
class AppealMessageAdmin(admin.ModelAdmin):
    ...

