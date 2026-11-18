#!/usr/bin/env python3
"""Build the itch.io deploy zip: games/flippout/itch/flippout_<VERSION>.zip.

Single source of truth: games/flippout/VERSION. Bump it, run this script, upload the zip.
The dev mode (flippout-dev.js) is left out of the zip. Older zips are moved into itch/archive/ so only the current one stays in the itch/ folder.
"""
import glob, os, shutil, zipfile

here = os.path.dirname(os.path.abspath(__file__))
game = os.path.dirname(here)
version = open(os.path.join(game, 'VERSION'), encoding='utf-8').read().strip()
out = os.path.join(here, 'flippout_%s.zip' % version)

archive = os.path.join(here, 'archive')
os.makedirs(archive, exist_ok=True)
for old in glob.glob(os.path.join(here, 'flippout_*.zip')):
    if old != out:
        shutil.move(old, os.path.join(archive, os.path.basename(old)))

with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    # the dev mode (flippout-dev.js + its script tag) never goes into the deploy zip
    html = open(os.path.join(game, 'index.html'), encoding='utf-8').read()
    html = ''.join(l for l in html.splitlines(True) if 'flippout-dev.js' not in l)
    z.writestr('index.html', html)
    for f in ('flippout.js', 'flippout-secrets.js', 'flippout.css', 'LICENSE'):
        z.write(os.path.join(game, f), f)
print('built', out)
