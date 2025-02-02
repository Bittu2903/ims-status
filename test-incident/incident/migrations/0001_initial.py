# Generated by Django 5.1.5 on 2025-01-18 18:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('incident_details', models.TextField()),
                ('status', models.CharField(choices=[('Open', 'Open'), ('Closed', 'Closed'), ('IN-Progress', 'IN-Progress')], max_length=50)),
                ('priority', models.CharField(choices=[('Low', 'Low'), ('High', 'High'), ('Medium', 'Medium')], max_length=50)),
                ('entity', models.CharField(choices=[('Enterprise', 'Enterprise'), ('Individual', 'Individual'), ('Government', 'Government')], max_length=50)),
                ('reported_date', models.DateTimeField(auto_now=True)),
                ('reporter_name', models.CharField(db_index=True, max_length=70)),
                ('incident_id', models.CharField(db_index=True, max_length=12, unique=True)),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
