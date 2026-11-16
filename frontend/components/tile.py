"""Komponente: App-Kachel (Knopf mit Ball/Balken/Bloecken) + Info-Modal. CSS: static/components/tile.css, modal.css"""
import html
from .modal import modal

def info_id(slug):
    return "info-" + "".join(c for c in slug if c.isalnum() or c == "-")

def app_tile(title, desc, slug):
    t, d, h = html.escape(title), html.escape(desc[:100]), html.escape("/" + slug)
    return (f'<article class="app-tile"><div class="tile-art" aria-hidden="true"><div class="t-stage">'
            '<i class="t-bricks"></i><i class="t-shadow"></i><i class="t-ball"></i><i class="t-bar"></i></div></div>'
            f'<button type="button" class="info-btn" data-modal-open="{info_id(slug)}" aria-label="Info zu {t}">i</button>'
            f'<div class="tile-copy"><h2>{t}</h2><p>{d}</p></div>'
            f'<a class="tile-launch" href="{h}" aria-label="{t} starten">Starten <span aria-hidden="true">↗</span></a></article>')

def app_info_modal(title, desc, slug, source, components=()):
    chips = "".join(f"<li>{html.escape(c)}</li>" for c in components) or '<li class="none">keine</li>'
    body = (f'<p class="info-desc">{html.escape(desc)}</p><dl class="info-list"><dt>Quelle</dt><dd><code>{html.escape(source)}</code></dd>'
            f'<dt>Komponenten</dt><dd><ul class="chips">{chips}</ul></dd></dl>'
            f'<a class="create-button info-go" href="/{html.escape(slug)}">Starten ↗</a>')
    return modal(info_id(slug), title, "APP INFO", body)
