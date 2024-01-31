from django.contrib import admin
from .models import MyUser, Appeals


@admin.register(MyUser)
class MyUserAdmin(admin.ModelAdmin):
    readonly_fields = ['password',]

@admin.register(Appeals)
class AppealsAdmin(admin.ModelAdmin):
    ...