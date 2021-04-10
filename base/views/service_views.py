from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth.models import User
from base.models import Service
from base.serializers import ServiceSerializer

from rest_framework import status

@api_view(['GET'])
def getServices(request):
    query = request.query_params.get('keyword')
    if query ==None:
        query = ''
    services = Service.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(services, 5)

    try:
        services =paginator.page(page)
    except PageNotAnInteger:
        services = paginator.page(1)
    except EmptyPage:
        services = paginator.page(paginator.num_pages)
    if page == None:
        page = 1
    page = int(page)

    serializer = ServiceSerializer(services, many=True)

    return Response({
        'services': serializer.data,
        'page': page, 
        'pages':paginator.num_pages
    })
@api_view(['GET'])
def getAllServices(request):
    services = Service.objects.all()

    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getService(request, pk):
    service = Service.objects.get(_id=pk)
    serializer = ServiceSerializer(service, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
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
@permission_classes([IsAdminUser])
def createService(request):
    service = Service.objects.create(
        name='Sample name',
        details='Sample details',
        price = 0,
    )
    serializer = ServiceSerializer(service, many=False)
    return Response(serializer.data)
@api_view(['DELETE'])

@permission_classes([IsAdminUser])
def deleteService(request, pk):
    service = Service.objects.get(_id=pk)
    service.delete()

    return Response("Servicio eliminado")

    

        