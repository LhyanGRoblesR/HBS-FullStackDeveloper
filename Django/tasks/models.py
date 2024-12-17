from django.db import models
from django.core.exceptions import ValidationError

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def clean(self):
        if not self.title.strip():
            raise ValidationError("El título no puede estar vacío.")

