from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.utils.decorators import method_decorator
from register.models import Expense
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse_lazy
from register.forms import Expenseform
import json


class ExpenseListView(ListView):
    model = Expense
    template_name = 'Expense/calendaryUL.html'

    @method_decorator(csrf_exempt)
    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = []
        try:
            for i in range(1, len(Expense.objects.all())+1):
                data.append(Expense.objects.get(pk=i).toJSON())
            
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        data = []
        
        for i in range(1, len(Expense.objects.all())+1):
            data.append(Expense.objects.get(pk=i).toJSON())
            
        # data = json.loads(data)
        context['title'] = 'Lista de Gastos'
        context['create_url'] = reverse_lazy('register:expense_create')
        context['list_url'] = reverse_lazy('register:expense_list')
        context['list_expense'] = data
        return context

class ExpenseCreateView(CreateView):
    model = Expense
    form_class = Expenseform
    template_name = 'Expense/create.html'
    success_url = reverse_lazy('register:expense_list')

    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            accion = request.POST['accion']
            if accion == 'add':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha Ingresado a Ninguna Opci??n.'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Registrar Gasto'
        context['entidad'] = 'Expense'
        context['list_url'] = reverse_lazy('register:expense_list')
        context['accion'] = 'add'
        return context

class ExpenseUpdateView(UpdateView):
    model = Expense
    form_class = Expenseform
    template_name = 'Expense/create.html'
    success_url = reverse_lazy('register:expense_list')

    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            accion = request.POST['accion']
            if accion == 'edit':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha Ingresado a Ninguna Opci??n.'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Editar Gastos'
        context['entidad'] = 'Expense'
        context['list_url'] = reverse_lazy('register:expense_list')
        context['accion'] = 'edit'
        return context

class ExpenseDeleteView(DeleteView):
    model = Expense
    template_name = 'Expense/delete.html'
    success_url = reverse_lazy('register:expense_list')

    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            self.object.delete()
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminar Gastos'
        context['entidad'] = 'Expense'
        context['list_url'] = reverse_lazy('register:expense_list')
        return context