import express from "express";
import LoginRepository from "../repositories/loginRep/LoginRepository.js";
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);


class LoginController {
  async show(req, res) {
    const email = req.params.email;
    const senha = req.params.senha;
    try {
      const usuarioLogado = await LoginRepository.validarLogin(email, senha);
      res.render("perfilUsuario", { usuarioLogado });
    } catch {
        res.render(path.join(__dirname, 'views', 'index'));
    }
  }

  async index(req, res) {
    res.render('index');
}
}

export default new LoginController();
