from django.urls import path
from register.views.Expense.views import *

app_name = 'register'

urlpatterns = [
    path('expense/add/', ExpenseCreateView.as_view(), name='expense_create'),
    path('expense/list/', ExpenseListView.as_view(), name='expense_list'),
    path('expense/edit/<int:pk>/', ExpenseUpdateView.as_view(), name='expense_update'),
    path('expense/delete/<int:pk>/', ExpenseDeleteView.as_view(), name='expense_delete'),
]