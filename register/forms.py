from django.db.models.fields import TextField
from django.forms import *
from register.models import *
import datetime

date = datetime.date.today()


class Expenseform(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['date'].widget.attrs['autofocus'] = True
    class Meta:
        model = Expense
        fields = '__all__'
        widgets = {
            'description': Textarea(
                attrs={
                    'placeholder': 'Ingrese una Descripcion',
                    'rows': 3,
                    'cols': 3
                }
            ),
            'date': TextInput(
                attrs={
                    'type': 'date',
                    'value': f'{date}',
                    'min': '14-10-2021',
                    'max': f'{date}',
                    'id': 'fecha'
                }
            )
        }

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid() :
                form.save()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data