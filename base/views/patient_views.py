from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Patient
from base.serializers import PatientSerializer
from rest_framework import status

from django.db.models import Q
from django.core.paginator import Paginator


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllPatients(request):
    try:
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)

        return Response(serializer.data)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def searchPatients(request, query):
    try:
        data = request.data
        if query == "allpatients":
            print("nothing")
            patients = Patient.objects.all()
            
            serializer = PatientSerializer(patients, many=True)
        else:
            print(query)
            patients = Patient.objects.filter(Q(name__icontains=query) | Q(
                lastName__icontains=query) | Q(email__icontains=query))
            # patients = Patient.objects.filter(name__icontains=query)
            serializer = PatientSerializer(patients, many=True)

        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPatient(request, pk):
    try:
        patient = Patient.objects.get(_id=pk)
        serializer = PatientSerializer(patient, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPatient(request):
    try:
        data = request.data
        Patient.objects.create(
            name=data['name'],
            sex=data['sex'],
            lastName=data['lastName'],
            age=data['age'],
            phone=data['phone'],
            email=data['email']
        )
        print("Paciente creado")
        message = {'detail': 'Paciente creado exitosamente'}
        return Response(message, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePatient(request, pk):
    try:
        data = request.data
        patient = Patient.objects.get(_id=pk)
        patient.name = data['name']
        patient.sex = data['sex']
        patient.lastName = data['lastName']
        patient.age = data['age']
        patient.phone = data['phone']
        patient.email = data['email']

        patient.save()

        serializer = PatientSerializer(patient, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePatient(request, pk):
    try:
        patient = Patient.objects.get(_id=pk)
        patient.delete()
        message = {'detail': 'Paciente eliminado'}
        return Response(message, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
