from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
# Create your models here


class User(AbstractUser):
    ENTERPRISE = 'Enterprise'
    INDIVIDUAL = 'Individual'
    GOVERNMENT = 'Government'
    ENTITY = (
        (ENTERPRISE, 'Enterprise'),
        (INDIVIDUAL, 'Individual'),
        (GOVERNMENT, 'Government')
    )
    address = models.TextField()
    city = models.CharField(max_length=50, db_index=True)
    state = models.CharField(max_length=20, db_index=True)
    country = models.CharField(max_length=50, db_index=True)
    pincode = models.CharField(max_length=15, db_index=True)
    country_code = models.CharField(max_length=5, db_index=True)
    mobile_number = models.CharField(max_length=15, db_index=True)
    entity = models.CharField(max_length=50, choices=ENTITY, default=INDIVIDUAL, db_index=True)
    fax = models.CharField(max_length=20, db_index=True, null=True, blank=True)
    phone_number = models.CharField(max_length=20, db_index=True, null=True, blank=True)

    def __str__(self):
        return self.email

