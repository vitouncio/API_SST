import express from "express";
import LoginRepository from "../repositories/loginRep/LoginRepository.js";
import path from "path";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { enviarEmailDeConfirmacao } from "../services/EmailService.js";
import { Console } from "console";

const __dirname = path.resolve("src", "app", "views");

class LoginController {
  async index(req, res) {
    res.render("../views/index.ejs");
  }


  async cad(req, res) {
    res.render("../views/cadastroUsuario.ejs");
  }

  async showTelaConfirmacao(req,res) {
    res.render("telaConfirmacaoEmail")
  }

  async token(req, res) {}
  async show(req, res) {
    const email = req.body.email;
    const senha = req.body.password;
    try {
      const usuarioLogado = await LoginRepository.validarLogin(email, senha);
      res.render("perfilUsuario", { usuarioLogado }); //usuarioLogado (chave para comunicação com front)
    } catch {
      res.render(path.join(__dirname, "index"));
    }
  }

  async update(req, res) {
    const idUsuario = req.body.id;
    const usuario = req.body;
    try {
      const usuarioLogado = await UsuarioRepository.update(usuario, idUsuario);
      console.log(usuarioLogado);
      res.render("perfilUsuario", { usuarioLogado }); //usuarioLogado (chave para comunicação com front)
    } catch {
      console.log(usuarioLogado);

      res.render(path.join(__dirname, "perfilUsuario"));
    }
  }

  async confirmarEmail(req, res) {
    const tokenInput = req.body.token;

    try{
      await UsuarioRepository.verififcarToken(tokenInput)
      console.log("conta validada")
    }catch(err){
      console.error(err)
    }
    
  } 

  async enviarEmailComToken(req, res) {
    const email = req.body.email;
    const usuario = req.body;
    usuario.isContaAtivada = 0;
    try {
      //usuario.token = await enviarEmailDeConfirmacao(email);
      console.log(usuario)
      //console.log(token)

      //await UsuarioRepository.create(usuario);
      res.render("telaConfirmacaoEmail.ejs", {email}) 
           
    } catch (err){
      console.error(err)
      res.status(500).send("Erro ao enviar email de confirmação.");
    }
  }

  async store(req, res) {
    const usuario = req.body;

    const result = await UsuarioRepository.create(usuario);
    res.json(result);
  }
}

export default new LoginController();
