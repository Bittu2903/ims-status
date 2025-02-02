from rest_framework import serializers
from .models import Incident


class IncidentViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        exclude = ['id']  # Exclude internal database field, keep others for the view


class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        exclude = ['incident_id', 'user_id', 'id']  # Exclude incident_id (generated on backend), user_id, and internal id
