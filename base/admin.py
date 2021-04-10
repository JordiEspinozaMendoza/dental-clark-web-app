from django.contrib import admin
from .models import Patient, Consult, Service
# Register your models here.
admin.site.register(Patient)
admin.site.register(Consult)
admin.site.register(Service)
