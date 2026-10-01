# Registro de decisões técnicas

## 2026-10-01 — Remoção do domínio financeiro

**Decisão:** remover rotas, serviços, contratos, telas, testes, dados e dependências ligados à antiga auditoria de pagamentos e ao motor financeiro.

**Motivo:** o novo objetivo do produto é inteligência documental para processos cíveis. Manter o domínio anterior aumentaria acoplamento, superfície de manutenção e risco de executar funcionalidades fora do novo escopo.

## 2026-10-01 — Geração somente via `text_generator`

**Decisão:** toda geração de linguagem do resumo, consolidação e chatbot passa por `BradescoBridgeClient.generate_text`, que chama `gpt_bradesco.text_generator`.

**Motivo:** reutilizar autenticação, TLS, endpoint e contrato corporativo existentes, sem criar um cliente paralelo.

## 2026-10-01 — Contexto documental temporário

**Decisão:** manter texto extraído dos PDFs somente em memória, com TTL e limite de workspaces.

**Motivo:** reduzir persistência desnecessária de conteúdo potencialmente sensível. Para produção distribuída, a estratégia deve ser revisada com Segurança, Arquitetura, Jurídico/Compliance e DPO antes de adotar um armazenamento compartilhado.

## 2026-10-01 — Timeline com fonte

**Decisão:** cada evento de timeline deve manter documento e página sempre que o modelo conseguir identificá-los.

**Motivo:** permitir conferência humana rápida e reduzir dependência de uma síntese sem rastreabilidade.
