"""Component: modal (<dialog>) + opener button. CSS/JS: static/components/modal.css, modal.js"""
import html

def modal(dom_id, title, eyebrow, body_html):
    return (f'<dialog id="{dom_id}" class="snippet-panel" data-modal><div class="panel-heading"><div><p class="eyebrow">{html.escape(eyebrow)}</p>'
            f'<h2>{html.escape(title)}</h2></div><button type="button" class="modal-close" data-modal-close aria-label="Close">✕</button></div>'
            f'{body_html}</dialog>')

def modal_trigger(dom_id, label, sub=""):
    return (f'<button type="button" class="new-tile" data-modal-open="{dom_id}"><span aria-hidden="true">＋</span><b>{html.escape(label)}</b>'
            f'<small>{html.escape(sub)}</small></button>')
