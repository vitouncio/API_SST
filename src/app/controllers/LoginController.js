import express from "express";
import LoginRepository from "../model/loginRep/LoginDAO.js";
import UsuarioRepository from "../model/UsuarioDAO.js";
import { Console } from "console";

class LoginController {
  async index(req, res) {
    res.render("../views/index.ejs");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Erro ao fazer logout");
      }
      res.redirect("/login");
    });
  }

  async home(req, res) {
    res.render("../views/usuario/homeUsuario.ejs", {
      usuarioLogado: req.session.usuario,
    });
  }

  async login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    try {
      const usuarioLogado = await LoginRepository.validarLogin(email, senha);
      req.session.usuario = usuarioLogado;
      res.redirect('/homeUsuario')
    } catch (error) {
      console.log(error);
      res.render("/login");
    }
  }
}

export default new LoginController();
