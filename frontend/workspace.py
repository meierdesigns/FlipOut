"""Frontend: Workspace-Seite aus Komponenten zusammengesetzt. Eingabe: Liste {slug,title,desc}."""
import html
from .components.tile import app_tile, app_info_modal
from .components.modal import modal, modal_trigger
from .components.new_app_form import new_app_form

def workspace(apps):
    tiles = "".join(app_tile(a["title"], a["desc"], a["slug"]) for a in apps)
    infos = "".join(app_info_modal(a["title"], a["desc"], a["slug"], f"pages/{a['slug']}.md", a.get("components", ())) for a in apps)
    new = modal_trigger("new-app", "Neue Mini-App", "MD-Snippet einfügen")
    return (f'<section class="workspace-head"><div><p class="eyebrow">MD•APP / WORKSPACE</p><h1>Deine Mini-Apps</h1>'
            f'<p class="lead">Leere Fläche. Kleine Programme. Ein Format.</p></div><span class="app-count">{len(apps):02d} APPS</span></section>'
            f'<section class="tile-grid">{tiles}{new}</section>'
            + infos + modal("new-app", "MD-Snippet einfügen", "NEW MODULE", new_app_form()))
