"""Einstiegspunkt: python3 app.py [port]. Backend in backend/, Frontend in frontend/ + static/."""
import os, sys
from backend.server import run

if __name__ == "__main__":
    run(int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 8000)))
