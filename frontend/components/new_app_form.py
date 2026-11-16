"""Komponente: Formular 'Neue Mini-App' (nur Markup, POST /apps)."""

def new_app_form():
    return ('''<form method="post" action="/apps"><div class="form-row"><label for="title">Name der Mini-App</label><input id="title" name="title" placeholder="z. B. Projektstatus" required></div>
<div class="form-row"><label for="slug">Dateiname</label><input id="slug" name="slug" placeholder="projektstatus" pattern="[a-z0-9-]+" required></div>
<div class="form-row"><label for="snippet">Markdown / MD-Code</label><textarea id="snippet" name="snippet" rows="12" placeholder="# Projektstatus&#10;&#10;@stats&#10;label: Fortschritt&#10;value: 72%&#10;change: +8%&#10;@end" required></textarea></div>
<button class="create-button" type="submit"><span aria-hidden="true">＋</span> Mini-App starten</button></form>''')
