# Fluxo visual do AI Ready

```mermaid
sequenceDiagram
    participant U as Advogado
    participant A as Angular
    participant B as FastAPI
    participant P as PyMuPDF
    participant T as gpt_bradesco.text_generator
    participant W as Workspace temporário

    U->>A: Seleciona PDFs do processo
    A->>B: POST /api/v3/ai-ready/analisar
    B->>P: Valida e extrai texto por página
    P-->>B: Texto + qualidade da camada textual
    loop Trechos dentro do limite configurado
        B->>T: Prompt de extração factual + páginas
        T-->>B: JSON parcial
    end
    B->>T: Consolidação das análises parciais
    T-->>B: Resumo + fatos + linha do tempo
    B->>W: Mantém contexto somente em memória com TTL
    B-->>A: Workspace estruturado
    A-->>U: Resumo, partes, pontos de atenção e timeline

    U->>A: Pergunta no chatbot
    A->>B: POST /api/v3/ai-ready/{workspace_id}/chat
    B->>W: Recupera contexto temporário
    B->>T: Pergunta + resumo + trechos dos autos
    T-->>B: Resposta textual
    B-->>A: Resposta + fontes quando disponíveis
```

## Decisões importantes

- O PDF é lido localmente com PyMuPDF; o projeto não chama OCR automaticamente nem envia o binário para outro serviço.
- A geração de linguagem passa pela função pública `text_generator` de `gpt_bradesco.py`.
- O conteúdo textual fica apenas no workspace em memória e expira pelo TTL configurado.
- A interface deve tratar a saída como apoio à revisão. Fatos, datas e conclusões relevantes precisam ser conferidos nos autos originais.
