from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth.models import User
from base.models import Service
from base.serializers import ServiceSerializer

from rest_framework import status


@api_view(['GET'])
def getServices(request, page):
    try:
        services = Service.objects.all()
        paginator = Paginator(services, 10)
        services = paginator.page(page)
        serializer = ServiceSerializer(services, many=True)
        return Response({'services': serializer.data, 'pages': paginator.num_pages})
    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getService(request, pk):
    service = Service.objects.get(_id=pk)
    serializer = ServiceSerializer(service, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateService(request, pk):
    data = request.data
    service = Service.objects.get(_id=pk)

    service.name = data['name']
    service.details = data['details']
    service.price = data['price']

    service.save()

    serializer = ServiceSerializer(service, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createService(request):
    try:
        service = Service.objects.create(
            name='Sample name',
            details='Sample details',
            price=0,
        )
        print(service)
        serializer = ServiceSerializer(service, many=False)
        return Response(serializer.data)

    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_401_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteService(request, pk):
    service = Service.objects.get(_id=pk)
    service.delete()

    return Response("Servicio eliminado")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data
    service_id = data['service_id']
    service = Service.objects.get(_id=service_id)

    service.image = request.FILES.get("image")

    service.save()

    return Response("Image was uploaded")
