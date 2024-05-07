import UsuarioRepository from "../repositories/UsuarioRepository.js";

class UsuarioController {
  async index(req, res) {
    const result = await UsuarioRepository.findAll();
    res.json(result);
  }

  async show(req, res) {
    const id = req.params.id;
    const result = await UsuarioRepository.findById(id);
    res.json(result)
  }

  async store(req, res) {
    /*listaClientes.push(req.body); //req.body = conteúdo do corpo da requisição
        res.status(201).send("Cliente cadastrado!");*/

    const usuario = req.body;
    const result = await UsuarioRepository.create(usuario)
    res.json(result)
  }

  async update(req, res) {
    const idUsuario = req.params.id;
    const usuario = req.body;
    const result = await UsuarioRepository.update(usuario, idUsuario)
    res.json(result)
    
  }

  async delete(req, res) {
    const idUsuario = req.params.id;
    const result = await UsuarioRepository.delete(idUsuario)
    res.json(result)
  }
}

//padrão singleton
export default new UsuarioController();
