from django.urls import path
from base.views import service_views as views
urlpatterns = [
    path('', views.getAllServices, name='services'),
    path('services/', views.getServices, name='get-services'),
    path('create/', views.createService, name = 'create-service'),

    path('<str:pk>/', views.getService, name='get-service'),
    path('delete/<str:pk>/', views.deleteService, name='delete-service'),
    path('update/<str:pk>/', views.updateService, name='update-service')
]
