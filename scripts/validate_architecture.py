"""Valida limites arquiteturais básicos do AI Ready."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_BACKEND_ROUTERS = {"__init__.py", "processes.py"}
EXPECTED_AI_SERVICES = {
    "__init__.py",
    "bradesco_bridge.py",
    "pdf_text_extractor.py",
    "process_intelligence.py",
    "prompt_loader.py",
    "workspace_store.py",
}


def main() -> int:
    """Confirma que a árvore executável corresponde ao escopo documental atual."""
    routers = {path.name for path in (ROOT / "backend" / "routers").glob("*.py")}
    services = {path.name for path in (ROOT / "backend" / "services").glob("*.py")}
    if routers != EXPECTED_BACKEND_ROUTERS:
        raise SystemExit(f"Routers inesperados no backend: {sorted(routers - EXPECTED_BACKEND_ROUTERS)}")
    if services != EXPECTED_AI_SERVICES:
        raise SystemExit(f"Serviços inesperados no backend: {sorted(services - EXPECTED_AI_SERVICES)}")

    source = (ROOT / "backend" / "services" / "process_intelligence.py").read_text(encoding="utf-8")
    bridge = (ROOT / "backend" / "services" / "bradesco_bridge.py").read_text(encoding="utf-8")
    if "generate_text(" not in source or "text_generator" not in bridge:
        raise SystemExit("A integração do chatbot deve continuar passando pelo gpt_bradesco.text_generator.")
    print("Arquitetura AI Ready validada.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
