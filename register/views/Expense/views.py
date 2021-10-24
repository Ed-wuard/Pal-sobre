from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.utils.decorators import method_decorator
from register.models import Expense
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse_lazy
from register.forms import Expenseform


class ExpenseListView(ListView):
    model = Expense
    template_name = 'Expense/calendaryTable.html'

    @method_decorator(csrf_exempt)
    #@method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Lista de Gastos'
        context['create_url'] = reverse_lazy('register:expense_create')
        context['list_url'] = reverse_lazy('register:expense_list')
        context['entidad'] = 'Expense'
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
                data['error'] = 'No ha Ingresado a Ninguna Opción.'
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
                data['error'] = 'No ha Ingresado a Ninguna Opción.'
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