from django.contrib.auth.decorators import login_required
from rest_framework import views, response, status
from .serializers import UserCreateSerializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponseRedirect
from django.utils import timezone
from django.contrib import auth
from .models import User
# Create your views here.


@login_required()
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')

class UserCreateAPIView(views.APIView):
    serializer_class = UserCreateSerializers

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User()
            user.active = True
            user.date_joined = timezone.localtime()
            user.city = serializer.validated_data['city']
            user.email = serializer.validated_data['email']
            user.state = serializer.validated_data['state']
            user.entity = serializer.validated_data['entity']
            user.username = serializer.validated_data['email']
            user.address = serializer.validated_data['address']
            user.country = serializer.validated_data['country']
            user.pincode = serializer.validated_data['pincode']
            user.last_name = serializer.validated_data['last_name']
            user.set_password(serializer.validated_data['password'])
            user.first_name = serializer.validated_data['first_name']
            user.country_code = serializer.validated_data['country_code']
            user.mobile_number = serializer.validated_data['mobile_number']
            
            # Optional
            user.fax = serializer.validated_data.get('fax')            
            user.phone_number = serializer.validated_data.get('phone_number')
            user.save()
            return response.Response({
                'fax': user.fax,
                'city': user.city,               
                'state': user.state,
                'email': user.email,
                'entity': user.entity,
                'address': user.address,
                'country': user.country,
                'pincode': user.pincode,
                'last_name': user.last_name,
                'first_name': user.first_name,
                'phone_number': user.phone_number,
                'mobile_number': '+' + user.country_code + user.mobile_number
                }, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
