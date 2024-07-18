import express from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para simular requisição PUT
app.use(methodOverride('_method'));

app.use(upload.none())

app.use(session({
  secret: 'o-tata-e-foda',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/logarUsuario') {
      next();
  } else {
      verificarSessao(req, res, next);
  }
});

// Usar o router
app.use(routes);

//ROTAS QUE PRECISAM DE VERIFICAÇÃO

export default app;
