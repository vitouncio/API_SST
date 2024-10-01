import UsuarioDAO from "../model/UsuarioDAO.js";

class UsuarioController {
  async index(req, res) {
    const result = await UsuarioDAO.findAll();
    res.json(result);
  }

  async show(req, res) {
    const id = req.params.id;
    const result = await UsuarioDAO.findById(id);
    res.json(result);
  }

  async showEmail(req, res) {
    const id = req.params.id;
    const result = await UsuarioDAO.findById(id);
    res.json(result);
  }

  async telaCadastroUsuario(req, res) {
    const isEditando = true
    try {
      res.render("usuario/cadastroUsuario", {isEditando});
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarUsuario(req, res) {
    try {
      const usuario_id = req.params.id;
      const isEditando = false

      const usuario = await UsuarioDAO.findById(usuario_id);
      res.render("usuario/telaEditarUsuario", { usuario,isEditando });
    } catch (err) {
      console.log(err);
    }
  }
  async telaBuscarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioDAO.findAll();

      res.render("usuario/telaBuscarUsuarios", { usuarios });
    } catch (err) {
      console.log(err);
    }
  }

  async cadastrarUsuario(req, res) {
    const usuario = req.body;
    delete usuario.confirmar_senha;
    try {
      const result = await UsuarioDAO.create(usuario);
      res.redirect("/homeUsuario");
    } catch (err) {
      console.error(err);
    }
  }

  async atualizarUsuario(req, res) {
    const idUsuario = req.params.id;
    const usuario = req.body;
    delete usuario.confirmar_senha;
    try {
      await UsuarioDAO.update(usuario, idUsuario);
      res.status(200).json({ message: "Deu bom" });
    } catch (error) {
      console.log(error);
    }
  }

  async deletarUsuario(req, res) {
    const idUsuario = req.params.id;
    try {

      await UsuarioDAO.delete(idUsuario);
      res.status(200).json({ message: "Deu bom" });
    } catch (error) {
      console.log(error)
    }
  }
}

//padrão singleton
export default new UsuarioController();
