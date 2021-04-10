from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import PatientSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data= super().validate(attrs)

        serializer =UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many = False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Email already taked'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user=request.user
    try:
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    try:
        serializer = UserSerializerWithToken(user, many=False)

        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        if data['password'] != '':
            user.password = make_password(data['password'])
        user.save()
        return Response(serializer.data)
    except :
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
    except :
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    try:
        user = User.objects.get(id=pk)

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)
    except :
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    try:
        data = request.data
        user = User.objects.get(id=pk)
        user.first_name = data['name']
        user.email = data['email']
        user.username = data['email']
        user.is_staff = data['isAdmin']
        user.save()
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
        
    except :
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)
        
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    try:
        user = User.objects.get(id=pk)
        user.delete()
        message = {'detail': 'Usuario eliminado'}
        return Response(message, status = status.HTTP_200_OK)
    except :
        message = {'detail': 'Something bad happen'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)
