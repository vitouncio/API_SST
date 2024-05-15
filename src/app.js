import express from "express"; //importando através do require o express para o projeto
import routes from './routes.js'
import bodyParser from "body-parser";
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express(); //cria uma instância do express na constante app

app.set('views', path.join(__dirname,"./app/views"))
app.set('view engine', 'ejs')



//indicar para o express ler body com JSON!!!!!!
app.use(express.json());

//usar o router
app.use(routes) 

export default app;
