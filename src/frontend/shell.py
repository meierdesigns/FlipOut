"""Frontend: page shell (head, sidebar, main). Knows no backend, only receives finished data."""
import html

HEAD_INIT = "try{if(localStorage.sb==='1'||(localStorage.sb===undefined&&innerWidth<=1000))document.documentElement.classList.add('sb-collapsed')}catch(e){}"
SIDEBAR_JS = "document.getElementById('sb-toggle').onclick=()=>{const c=document.documentElement.classList.toggle('sb-collapsed');try{localStorage.sb=c?'1':'0'}catch(e){}}"
STYLES = ["/static/style.css", "/static/components/tile.css", "/static/components/modal.css"]

def nav(items):
    """items: [(href, title)]"""
    return "".join(f'<a href="{h}">{html.escape(t)}</a>' for h, t in items)

def shell(title, body, nav_items, theme_name, theme_css, effects=(), main_class=""):
    links = "".join(f'<link rel="stylesheet" href="{s}">' for s in STYLES)
    cls = f' class="{main_class}"' if main_class else ""
    return (
        '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        f"<title>{html.escape(title)}</title>{links}<script>{HEAD_INIT}</script></head>"
        f'<body class="theme-{theme_name} {" ".join(effects)}" style="{theme_css}">'
        '<aside><button id="sb-toggle" type="button" aria-label="Toggle sidebar" title="Toggle sidebar"><i></i></button>'
        f"<strong>MD•APP</strong>{nav(nav_items)}</aside><main{cls}>{body}</main><script>{SIDEBAR_JS}</script><script src='/static/components/modal.js'></script></body></html>"
    )
