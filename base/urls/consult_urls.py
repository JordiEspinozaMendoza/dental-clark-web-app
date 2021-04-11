from django.urls import path
from base.views import consult_views as views
urlpatterns = [
    path('create/', views.createConsult, name='create-consult'),

    path('getconsult/<str:pk>/', views.getConsult, name='get-consult'),

    path('history/<str:history>/<str:person>/<str:page>/',
         views.history, name='get-history'),

    path('getconsults/<str:query>/<str:page>/<str:token>',
         views.getAllConsults, name='get-consults'),
    path('update/<str:pk>/', views.updateConsult, name='update-consult'),
    path('delete/<str:pk>/', views.deleteConsult, name='delete-consult'),
]
