from rest_framework import serializers
from .models import User


class UserCreateSerializers(serializers.Serializer):    
    email = serializers.EmailField()
    address= serializers.CharField()
    city = serializers.CharField(max_length=50)    
    state = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=50)    
    pincode = serializers.CharField(max_length=15)
    last_name = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=20)
    country_code = serializers.CharField(max_length=5)
    mobile_number = serializers.CharField(max_length=15)
    entity = serializers.ChoiceField(choices=User.ENTITY)
    fax = serializers.CharField(max_length=20, required=False)
    phone_number = serializers.CharField(max_length=20, required=False)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data