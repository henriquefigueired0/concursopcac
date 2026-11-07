# Plano de estudos PCAC: Perito Criminal, Informática Forense

Dashboard de estudos em JavaScript puro, sem dependências e sem arquivos HTML ou CSS. O arquivo `app.js` contém os estilos, a montagem da página, o conteúdo programático e a lógica.

- Período: 09/11/2026 a 08/01/2027, 3 h por dia. Prova em 24/01/2027.
- Checklist por dia: três blocos, itens do conteúdo, questões feitas e acertos, anotações.
- Mapa de setores dos 61 dias, calendário e progresso por área.
- Revisão espaçada em 1, 7 e 30 dias. Domingos: simulado e redação.
- Progresso salvo no navegador, com exportar e importar em JSON.
- **Baixar .ics** gera a agenda para o Google Calendar (fuso `America/Rio_Branco`).

## Como executar

```
node server.js
```

Abra http://localhost:3000. O servidor só entrega `app.js` com uma linha de página mínima, gerada pelo próprio JavaScript.

Sem Node: abra qualquer página em branco no navegador, cole o conteúdo de `app.js` no console e pressione Enter.

## Arquivos

```
app.js        aplicação completa
server.js     servidor local
package.json  atalho npm start
```

Para editar temas e datas, procure `const T=[` (temas), `KEY` (datas-chave) e `new Date(2026,10,9)` (início do plano) em `app.js`.
