from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Consult, Patient, User
from base.serializers import PatientSerializer, ConsultSerializer
from rest_framework import status

from datetime import datetime
from django.core.paginator import Paginator


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllConsults(request, query, page,token):
    print(token)
    try:
        if query == "allconsults":
            consults = Consult.objects.all()
            paginator = Paginator(consults, 10)
            consults = paginator.page(page)

            serializer = ConsultSerializer(consults, many=True)
            return Response({'consults': serializer.data, 'pages': paginator.num_pages})
        else:
            consults = Consult.objects.filter(date__icontains=query)
            paginator = Paginator(consults, 10)
            consults = paginator.page(page)

            serializer = ConsultSerializer(consults, many=True)
            return Response({'consults': serializer.data, 'pages': paginator.num_pages})
    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history(request, page, person, history):
    try:
        if history == 'patient':
            consults = Consult.objects.filter(Patient=person)
            paginator = Paginator(consults, 5)
            consults = paginator.page(page)

            serializer = ConsultSerializer(consults, many=True)
            return Response({'consults': serializer.data, 'pages': paginator.num_pages})
        else:
            consults = Consult.objects.filter(User=person)
            paginator = Paginator(consults, 5)
            consults = paginator.page(page)

            serializer = ConsultSerializer(consults, many=True)
            return Response({'consults': serializer.data, 'pages': paginator.num_pages})

    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getConsult(request, pk):
    print("Get consult")
    try:
        consult = Consult.objects.get(_id=pk)
        serializer = ConsultSerializer(consult, many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createConsult(request):
    print(request.data)
    try:
        data = request.data
        user = request.user
        patient = Patient.objects.get(_id=data['patient'])
        Consult.objects.create(User=user, Patient=patient, date=datetime.now(
        ), details=data['details'], price=data["price"])
        message = {'detail': 'Consulta creada exitosamente'}
        return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateConsult(request, pk):
    print("Update consult")
    try:
        data = request.data
        patient = Patient.objects.get(_id=data['patient'])

        consult = Consult.objects.get(_id=pk)
        consult.details = data['details']
        consult.Patient = patient
        consult.save()
        message = {'detail': 'Consulta editada exitosamente'}
        return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteConsult(request, pk):
    try:
        consult = Consult.objects.get(_id=pk)
        consult.delete()
        message = {'detail': 'Consulta eliminada'}
        return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)

        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
