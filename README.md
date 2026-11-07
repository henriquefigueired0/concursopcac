# Plano de estudos PCAC: Perito Criminal, Informática Forense

Dashboard de estudos em um único `index.html` (HTML, CSS e JavaScript puro, sem dependências nem build).

- Período: 09/11/2026 a 08/01/2027, 3 h por dia. Prova em 24/01/2027.
- Checklist por dia: três blocos, itens do conteúdo, questões feitas e acertos, anotações.
- Mapa de setores, calendário e progresso por área.
- Revisão espaçada em 1, 7 e 30 dias. Domingos: simulado e redação.
- Progresso salvo no navegador, com exportar e importar em JSON.
- **Baixar .ics** gera a agenda para o Google Calendar (fuso `America/Rio_Branco`).

## Deploy na Vercel

Pelo GitHub: envie estes arquivos para um repositório, importe em vercel.com/new e use **Framework Preset: Other**, sem build command e sem output directory.

Pela CLI: `npx vercel --prod` dentro da pasta.

O progresso fica no `localStorage` de cada navegador. Use Exportar e Importar para levá-lo a outro aparelho.
