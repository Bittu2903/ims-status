import random
from django.db import models
from user.models import User
from datetime import datetime
# Create your models here.


class Incident(models.Model):
    LOW = 'Low'
    HIGH = 'High'
    MEDIUM = 'Medium'
    PRIORITY = (
        (LOW, 'Low'),
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
    )

    OPEN = 'Open'
    CLOSED = 'Closed'
    IN_PROGRESS = 'IN-Progress'

    STATUS = (
        (OPEN, 'Open'),
        (CLOSED, 'Closed'),
        (IN_PROGRESS, 'IN-Progress')
    )
    incident_details = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS)
    priority = models.CharField(max_length=50, choices=PRIORITY)
    entity = models.CharField(max_length=50, choices=User.ENTITY)
    reported_date = models.DateTimeField(auto_now=True)
    reporter_name = models.CharField(max_length=70, db_index=True)
    incident_id = models.CharField(max_length=12, db_index=True, unique=True)
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if not self.incident_id:  # Generate unique incident ID if not provided
            self.incident_id = f'RMG{random.randint(10000, 99999)}{datetime.now().year}'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.incident_id