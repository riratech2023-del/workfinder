from django.db import models

# Create your models here.
class Jobs(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField()
    link = models.URLField()

    def __str__(self):
        return self.name