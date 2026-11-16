"""Component: 'New mini-app' form (markup only, POST /apps)."""

def new_app_form():
    return ('''<form method="post" action="/apps"><div class="form-row"><label for="title">Mini-app name</label><input id="title" name="title" placeholder="e.g. Project status" required></div>
<div class="form-row"><label for="slug">File name</label><input id="slug" name="slug" placeholder="project-status" pattern="[a-z0-9-]+" required></div>
<div class="form-row"><label for="snippet">Markdown / MD code</label><textarea id="snippet" name="snippet" rows="12" placeholder="# Project status&#10;&#10;@stats&#10;label: Progress&#10;value: 72%&#10;change: +8%&#10;@end" required></textarea></div>
<button class="create-button" type="submit"><span aria-hidden="true">＋</span> Create mini-app</button></form>''')
