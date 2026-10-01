from types import SimpleNamespace

from backend.config import Settings
from backend.services.bradesco_bridge import BradescoBridgeClient


def test_generate_text_uses_text_generator(monkeypatch) -> None:
    calls = []

    def text_generator(payload, parameters):
        calls.append((payload, parameters))
        return "resposta"

    module = SimpleNamespace(text_generator=text_generator)
    client = BradescoBridgeClient(Settings(bradesco_text_model="deployment-teste"))
    monkeypatch.setattr(client, "_module", module)

    result = client.generate_text("pergunta", max_tokens=2000)

    assert result == "resposta"
    assert calls[0][0] == "pergunta"
    assert calls[0][1]["deployment_name"] == "deployment-teste"
    assert calls[0][1]["async_mode"] is False
    assert calls[0][1]["stream"] is False
