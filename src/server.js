import app from "./app.js";


const PORT = process.env.port || 3000; //definição da porta lógica (3000 é usual)


// Inicializa o servidor na porta definida
// A função app.listen() recebe dois argumentos:
// 1. A porta em que o servidor vai rodar
// 2. Uma função de callback que será executada assim que o servidor for iniciado
 app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });