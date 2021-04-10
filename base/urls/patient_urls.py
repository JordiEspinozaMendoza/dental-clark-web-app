from django.urls import path
from base.views import patient_views as views

urlpatterns = [
    path('create/', views.createPatient, name='create-patient'),

    path('', views.getAllPatients, name='get-patients'),
    path('<str:pk>/', views.getPatient, name='get-patient'),
    path('search/<str:query>/', views.searchPatients, name='search-patient'),
    path('delete/<str:pk>/', views.deletePatient, name='delete-patient'),
    path('update/<str:pk>/', views.updatePatient, name='update-patient'),
]
