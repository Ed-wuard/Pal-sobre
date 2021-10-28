import datetime
from django.db import models
from django.forms.models import model_to_dict


class Expense(models.Model):
    date = models.DateField(verbose_name='Fecha')
    amount = models.DecimalField(decimal_places=2, max_digits=3, default=0.0, verbose_name='Monto')
    description  = models.TextField(verbose_name='Descripcion')
    

    def __str__(self):
        return str(self.date.strftime('%d-%m-%y'))

    def toJSON(self):
        item = model_to_dict(self)

        if self.date:
            item['date'] = self.date.strftime('%d-%m-%y')

        return item

    class Meta:
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'
        db_table = 'expense'
        ordering = ['id']