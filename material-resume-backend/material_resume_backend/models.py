from cuser.models import AbstractCUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractCUser):
    class SettingPageThemes(models.TextChoices):
        THEME_BASELINE = 'THEME_BASELINE', _('Baseline')
        THEME_CRANE = 'THEME_CRANE', _('Crane')
        THEME_DARK = 'THEME_DARK', _('Dark')

    setting_page_theme = models.CharField(
        max_length=32,
        choices=SettingPageThemes.choices,
        default='THEME_BASELINE'
    )
    setting_override_theme = models.BooleanField(default=False)
