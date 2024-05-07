import app from "./app.js";


const PORT = process.env.port || 3000; //definição da porta lógica (3000 é usual)



 app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });