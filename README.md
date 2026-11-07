# Plano de estudos PCAC: Perito Criminal, Informática Forense

Dashboard estático (HTML, CSS e JavaScript puro, sem dependências) com calendário de estudos e revisão para o concurso da Polícia Civil do Acre (Edital nº 001 SEAD/PCAC, banca IDECAN).

- Período: 09/11/2026 a 08/01/2027, 3 h por dia
- Prova objetiva e discursiva: 24/01/2027
- Blocos diários: teoria (90 min), questões (60 min) e revisão espaçada em 1, 7 e 30 dias (30 min)
- Domingos: simulado, caderno de erros e redação técnica
- Progresso salvo no navegador (`localStorage`), com exportar e importar em JSON
- Botão **Baixar .ics** gera a agenda para importar no Google Calendar (fuso `America/Rio_Branco`)

## Como usar

Abra `index.html` no navegador. Não há build nem instalação.

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos (Add file, Upload files) na branch `main`.
2. Em **Settings, Pages**, escolha **Source: GitHub Actions**.
3. O workflow `.github/workflows/pages.yml` publica o site a cada push.

## Estrutura

```
index.html
assets/style.css   estilos e tema claro/escuro
assets/data.js     temas e conteúdo programático
assets/app.js      calendário, progresso, exportação e .ics
.github/workflows/pages.yml
```

Para editar temas ou datas, altere `assets/data.js` (`T`, `KEY`) e `assets/app.js` (data inicial `new Date(2026,10,9)` e 61 dias).
