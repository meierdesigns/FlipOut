"""Frontend: page shell (head, sidebar, main). Knows no backend, only receives finished data."""
import html

SIDEBAR_JS = ("(()=>{const b=document.getElementById('sb-toggle'),m=document.getElementById('sb-menu');"
    "const set=o=>{m.hidden=!o;b.setAttribute('aria-expanded',o?'true':'false')};"
    "b.onclick=e=>{e.stopPropagation();set(m.hidden)};"
    "document.addEventListener('click',e=>{if(!m.hidden&&!m.contains(e.target))set(false)});"
    "document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});"
    "const f=document.getElementById('sb-full');if(f)f.onclick=()=>{const d=document,el=d.documentElement;"
    "if(d.fullscreenElement||d.webkitFullscreenElement)(d.exitFullscreen||d.webkitExitFullscreen).call(d);"
    "else(el.requestFullscreen||el.webkitRequestFullscreen).call(el)}})()")
HOME_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5.5 10v10h4.5v-6h4v6h4.5V10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>'
STYLES = ["/static/style.css", "/static/components/tile.css", "/static/components/modal.css"]

def nav(items):
    """items: [(href, title)]"""
    return "".join(f'<a href="{h}">{html.escape(t)}</a>' for h, t in items)

def shell(title, body, nav_items, theme_name, theme_css, effects=(), main_class=""):
    links = "".join(f'<link rel="stylesheet" href="{s}">' for s in STYLES)
    cls = f' class="{main_class}"' if main_class else ""
    return (
        '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        f"<title>{html.escape(title)}</title>{links}</head>"
        f'<body class="theme-{theme_name} {" ".join(effects)}" style="{theme_css}">'
        f'<aside><a id="sb-home" href="/" title="Home" aria-label="Home">{HOME_ICON}</a>'
        '<button id="sb-toggle" type="button" aria-label="Menu" title="Menu" aria-haspopup="true" aria-expanded="false"><i></i></button>'
        '<button id="sb-full" type="button" title="Fullscreen" aria-label="Fullscreen">\u26f6</button>'
        f'<nav id="sb-menu" hidden><strong>MD•APP</strong>{nav(nav_items)}</nav>'
        f"</aside><main{cls}>{body}</main><script>{SIDEBAR_JS}</script><script src='/static/components/modal.js'></script></body></html>"
    )
