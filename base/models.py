from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


class Patient(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    sex = models.CharField(max_length=10, null=True, blank=True)
    lastName = models.CharField(max_length=200, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Consult(models.Model):
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    Patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)
    details = models.TextField()
    price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.details


class Service(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    details = models.TextField()
    price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    image = CloudinaryField('image', )

    def __str__(self):
        return self.name
