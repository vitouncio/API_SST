import express from "express"; //importando através do require o express para o projeto
import routes from "./routes.js";
import bodyParser from "body-parser";
import path from "path";
import methodOverride from 'method-override'
const __dirname = path.resolve("src", "app");
const app = express(); //cria uma instância do express na constante app

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware de conversão de body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Middleware pra simular requisição put
app.use(methodOverride('_method'))


//usar o router
app.use(routes);

export default app;
