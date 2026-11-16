"""Backend: Markdown-Inhalte (Frontmatter, Module, Rendering, Seiten)."""
import html, re
from .paths import PAGES, MODULES

def frontmatter(src):
    meta = {}
    if src.startswith("---"):
        parts = src.split("---", 2)
        if len(parts) == 3:
            for line in parts[1].strip().splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip().strip('"\'')
            src = parts[2].lstrip()
    return meta, src

def inline(s):
    s = html.escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    return s

def module(name, body):
    p = MODULES / f"{name}.md"
    if not p.exists():
        return f'<div class="missing">Unknown module: {html.escape(name)}</div>'
    meta, tpl = frontmatter(p.read_text())
    props = {}
    for line in body.strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            props[k.strip()] = v.strip()
    for k, v in props.items():
        tpl = tpl.replace("{{ " + k + " }}", html.escape(v))
        tpl = tpl.replace("{{" + k + "}}", html.escape(v))
    return tpl

def render(src):
    out, paragraph = [], []
    list_open = False
    def flush():
        if paragraph:
            out.append("<p>" + "<br>".join(paragraph) + "</p>")
            paragraph.clear()
    def close_list():
        nonlocal list_open
        if list_open:
            out.append("</ul>")
            list_open = False

    lines = src.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("@") and not line.startswith("@end"):
            m = re.match(r"@([\w-]+)(?:\s+(.*))?$", line.strip())
            if m:
                name, rest = m.group(1), m.group(2) or ""
                body = []
                if rest and "=" in rest:
                    for pair in re.findall(r'(\w+)=("[^"]*"|\S+)', rest):
                        body.append(f"{pair[0]}: {pair[1].strip(chr(34))}")
                i += 1
                while i < len(lines) and lines[i].strip() != "@end":
                    body.append(lines[i])
                    i += 1
                flush(); close_list()
                out.append(module(name, "\n".join(body)))
                i += 1
                continue
        if line.startswith("# "):
            flush(); close_list(); out.append(f"<h1>{inline(line[2:])}</h1>")
        elif line.startswith("## "):
            flush(); close_list(); out.append(f"<h2>{inline(line[3:])}</h2>")
        elif line.startswith("### "):
            flush(); close_list(); out.append(f"<h3>{inline(line[4:])}</h3>")
        elif line.strip() == "":
            flush(); close_list()
        elif line.startswith("- "):
            flush()
            if not list_open:
                out.append("<ul>")
                list_open = True
            out.append(f"<li>{inline(line[2:])}</li>")
        else:
            close_list(); paragraph.append(inline(line))
        i += 1
    flush()
    close_list()
    return "\n".join(out)

def app_content(meta, src):
    content = render(src)
    app_name = meta.get("app", "")
    if app_name == "golf":
        mode = meta.get("mode", "breakout")
        content += module("golf", f"mode: {mode}\nlabel: {meta.get('title', 'Ingolf')}")
    return content

def list_pages():
    """Alle Seiten als Dict(slug,title,desc,meta,src), sortiert (index, order, Titel)."""
    out = []
    for f in PAGES.glob("*.md"):
        meta, src = frontmatter(f.read_text())
        title = meta.get("title", f.stem.replace("-", " ").title())
        desc = meta.get("desc") or next((l.strip() for l in src.splitlines() if l.strip() and not l.startswith("@")), "MD mini app")
        out.append({"slug": f.stem, "title": title, "desc": desc, "meta": meta, "src": src, "components": used_components(meta, src)})
    def key(p):  # index zuerst, dann nach `order` (Frontmatter, Standard 100), dann Titel
        try: order = int(p["meta"].get("order", 100))
        except ValueError: order = 100
        return (p["slug"] != "index", order, p["title"].lower())
    return sorted(out, key=key)

def get_page(slug):
    f = (PAGES / (slug or "index")).with_suffix(".md")
    if not f.exists():
        return None
    meta, src = frontmatter(f.read_text())
    return {"slug": f.stem, "meta": meta, "src": src}

def save_page(title, slug, snippet):
    """Legt eine Seite an. Wirft ValueError bei ungueltiger Eingabe."""
    if not title or not re.fullmatch(r"[a-z0-9-]+", slug) or not snippet:
        raise ValueError("Title, slug and snippet are required")
    (PAGES / f"{slug}.md").write_text(snippet if snippet.startswith("---") else f"---\ntitle: {title}\n---\n\n{snippet}\n")

def used_components(meta, src):
    """Verwendete Komponenten einer Seite: @module-Direktiven + eingebaute App (app:)."""
    names = []
    if meta.get("app"):
        names.append(meta["app"] + (f" ({meta['mode']})" if meta.get("mode") else ""))
    for m in re.finditer(r"^@([a-z0-9_-]+)", src, re.M):
        if m.group(1) != "end" and m.group(1) not in names:
            names.append(m.group(1))
    return names
