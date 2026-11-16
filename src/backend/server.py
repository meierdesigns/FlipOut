"""Backend: HTTP-Server und Routen. Setzt Daten (backend.*) und Darstellung (frontend.*) zusammen."""
import html, re
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
from .paths import STATIC_ROUTES
from . import content, theme as themes
from frontend.shell import shell
from frontend.workspace import workspace

def _theme_ctx():
    t = themes.load_theme()
    effects = [f"effect-{k}" for k in ("scanlines", "glow") if t.get(k) == "true"]
    name = re.sub(r"[^a-z0-9-]", "", t.get("name", "modern").lower())
    return name, themes.theme_css(t), effects

def render_page(path):
    slug = path.strip("/") or "index"
    pg = content.get_page(slug)
    if not pg:
        return "<h1>404</h1><p>Page not found.</p>", 404
    nav_items = [("/" if p["slug"] == "index" else "/" + p["slug"], p["title"]) for p in content.list_pages()]
    name, css, effects = _theme_ctx()
    if slug == "index":
        apps = [p for p in content.list_pages() if p["slug"] != "index"]
        return shell("MD•APP Workspace", workspace(apps), nav_items, name, css, effects, "workspace"), 200
    return shell(pg["meta"].get("title", "MD App"), content.app_content(pg["meta"], pg["src"]), nav_items, name, css, effects), 200

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/apps":
            return self.send_error(404)
        v = parse_qs(self.rfile.read(int(self.headers.get("Content-Length", 0))).decode("utf-8"))
        try:
            content.save_page(v.get("title", [""])[0].strip(), v.get("slug", [""])[0].strip().lower(), v.get("snippet", [""])[0].strip())
        except ValueError as e:
            return self.send_error(400, str(e))
        self.send_response(303); self.send_header("Location", "/"); self.end_headers()

    def do_GET(self):
        url = self.path.split("?")[0]
        for prefix, base in STATIC_ROUTES.items():
            if url.startswith(prefix):
                f = (base / url[len(prefix):]).resolve()
                if f.is_file() and base.resolve() in f.parents:
                    ctype = {".js": "application/javascript", ".css": "text/css", ".html": "text/html; charset=utf-8"}.get(f.suffix, "application/octet-stream")
                    self.send_response(200); self.send_header("Content-Type", ctype); self.end_headers(); self.wfile.write(f.read_bytes()); return
        body, status = render_page(self.path.split("?")[0])
        self.send_response(status); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers(); self.wfile.write(body.encode())

def run(port):
    print(f"MD•APP → http://127.0.0.1:{port}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
