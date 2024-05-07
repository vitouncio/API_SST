import express from "express"; //importando através do require o express para o projeto
import routes from './routes.js'

const app = express(); //cria uma instância do express na constante app

//usar o router
app.use(routes)

//indicar para o express ler body com JSON!!!!!!
app.use(express.json());


export default app;
