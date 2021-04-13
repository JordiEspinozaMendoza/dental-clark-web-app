from django.urls import path
from base.views import service_views as views
urlpatterns = [
    path('upload/', views.uploadImage, name="image-upload"),
    path('create/', views.createService, name='create-service'),
    path('getservice/<str:pk>/', views.getService, name='get-service'),
    path('getservices/<str:page>/', views.getServices, name='get-services'),

    path('delete/<str:pk>/', views.deleteService, name='delete-service'),
    path('update/<str:pk>/', views.updateService, name='update-service')
]
