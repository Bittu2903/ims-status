from .views import IncidentAPIView
from django.urls import path


urlpatterns = [
    path('', IncidentAPIView.as_view(), name='incident_list_create'),  # For listing and creating incidents
    path('<str:incident_id>/', IncidentAPIView.as_view(), name='incident_update')
]
