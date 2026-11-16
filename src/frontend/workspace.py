"""Frontend: workspace page assembled from components. Input: list of {slug,title,desc}."""
import html
from .components.tile import app_tile, app_info_modal
from .components.modal import modal, modal_trigger
from .components.new_app_form import new_app_form

def workspace(apps):
    tiles = "".join(app_tile(a["title"], a["desc"], a["slug"]) for a in apps)
    infos = "".join(app_info_modal(a["title"], a["desc"], a["slug"], f"content/pages/{a['slug']}.md", a.get("components", ())) for a in apps)
    new = modal_trigger("new-app", "New mini-app", "Insert MD snippet")
    return (f'<section class="workspace-head"><div><p class="eyebrow">MD•APP / WORKSPACE</p><h1>Your mini-apps</h1>'
            f'<p class="lead">Blank canvas. Small programs. One format.</p></div><span class="app-count">{len(apps):02d} APPS</span></section>'
            f'<section class="tile-grid">{tiles}{new}</section>'
            + infos + modal("new-app", "Insert MD snippet", "NEW MODULE", new_app_form()))
