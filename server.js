// Servidor local sem dependências: node server.js  (abre em http://localhost:3000)
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = process.env.PORT || 3000;
const page = "<!doctype html><meta charset=utf-8><body><script src=/app.js></script>";
http.createServer((req, res) => {
  if (req.url.split("?")[0] === "/app.js") {
    res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
    return res.end(fs.readFileSync(path.join(__dirname, "app.js")));
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page);
}).listen(PORT, () => console.log("Plano PCAC em http://localhost:" + PORT));
