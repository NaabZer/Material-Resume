from django import forms
from cuser.forms import UserCreationForm
from django.contrib.auth import get_user_model


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True,
                                 help_text='')
    last_name = forms.CharField(max_length=30, required=True,
                                help_text='')

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name',
                  'password1', 'password2', )
