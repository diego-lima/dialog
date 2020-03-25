from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.urls import URLPattern, URLResolver

urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])

def list_urls(lis, acc=None):
    if acc is None:
        acc = []
    if not lis:
        return
    l = lis[0]
    if isinstance(l, URLPattern):
        yield acc + [str(l.pattern)]
    elif isinstance(l, URLResolver):
        yield from list_urls(l.url_patterns, acc + [str(l.pattern)])
    yield from list_urls(lis[1:], acc)


class Command(BaseCommand):
    help = 'Printa no terminal as urls registradas.'

    stylizers = None

    def add_arguments(self, parser):
        self.stylizers = [ # cada um desses dá um estilo diferente (cor e negrito)
            self.style.MIGRATE_HEADING,
            self.style.SUCCESS,
            self.style.MIGRATE_LABEL,
            self.style.HTTP_SERVER_ERROR,
            self.style.ERROR,
            self.style.NOTICE,
            self.style.WARNING,
            self.style.SQL_COLTYPE,
            self.style.SQL_KEYWORD,
            self.style.SQL_TABLE,
            self.style.HTTP_INFO,
            self.style.HTTP_SUCCESS,
            self.style.HTTP_NOT_MODIFIED,
        ]
        pass

    def handle(self, *args, **options):
        """
        Cada raíz, tipo 'admin/(...)', 'auth/(...)', tem uma cor diferente.
        """
        stylizer = {}
        contador = 0
        for p in list_urls(urlconf.urlpatterns):
            url = ''.join(p)
            chave = url.split('/')[0].split("\\")[0]
            if chave not in stylizer:
                stylizer[chave] = contador % len(self.stylizers)
                contador = contador + 1
            style = self.stylizers[stylizer[chave]]
            self.stdout.write(style(url))
