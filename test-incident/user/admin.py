from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from user.models import User
# Register your models here.


admin.site.register(User)