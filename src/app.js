import express from 'express';
import routes from './routes.js';
import path from 'path';
import methodOverride from 'method-override';
import session from "express-session" 
import multer from "multer"
import verificarSessao from './app/middlewares/verificarSessao.js'

const __dirname = path.resolve("src", "app");
const app = express(); // cria uma instância do express na constante app
const upload = multer()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware de conversão de body
//permite analisar dados convertidor em url
app.use(express.urlencoded({ extended: true })); // permite que o body contenha valores de qq tipo 
app.use(express.json()); //converte o corpo da req em json

// Middleware para simular requisição PUT
app.use(methodOverride('_method')); //permite usar PUT e DELETE em forms

app.use(upload.none()) //processar forms que n tem arquivos

app.use(session({
  secret: 'o-tata-e-foda', //assinatura da sessão
  resave: false, //não salva a sessão a cada req
  saveUninitialized: false, //não salva sessões vazias
  cookie: { secure: false } //não usa https (não é seguro)
}));

// Middleware para verificar sessão
app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/logarUsuario') {
      next();
  } else {
      verificarSessao(req, res, next);
  }
});

// Middleware para servir arquivos estáticos a partir da pasta public
app.use(express.static(path.join(__dirname, 'public')));


// Usar o router
app.use(routes);


export default app;
