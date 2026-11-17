#!/usr/bin/env python3
"""Build the itch.io deploy zip: games/flippout/itch/flippout_<VERSION>.zip.

Single source of truth: games/flippout/VERSION. Bump it, run this script, upload the zip.
Older zips are removed so only the current one stays in the repo (old versions: git tags / history).
"""
import glob, os, zipfile

here = os.path.dirname(os.path.abspath(__file__))
game = os.path.dirname(here)
version = open(os.path.join(game, 'VERSION'), encoding='utf-8').read().strip()
out = os.path.join(here, 'flippout_%s.zip' % version)

for old in glob.glob(os.path.join(here, 'flippout_*.zip')) + glob.glob(os.path.join(here, 'flippout-itch.zip')):
    if old != out:
        os.remove(old)

with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in ('index.html', 'flippout.js', 'flippout.css', 'LICENSE'):
        z.write(os.path.join(game, f), f)
print('built', out)
