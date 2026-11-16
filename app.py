"""Einstiegspunkt: python3 app.py [port]. Code in src/ (backend, frontend, static), Inhalt in content/, Spiele in games/."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))
from backend.server import run

if __name__ == "__main__":
    run(int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 8000)))
