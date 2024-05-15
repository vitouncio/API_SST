import FornecedorRepository from "../repositories/FornecedorRepository.js";

class FornecedorController {
  async index(req, res) {
    const result = await FornecedorRepository.findAll();
    res.json(result);
  }

  async show(req, res) {
    const id = req.params.id;
    const result = await FornecedorRepository.findById(id);
    res.json(result)
  }

  async store(req, res) {
    /*listaClientes.push(req.body); //req.body = conteúdo do corpo da requisição
        res.status(201).send("Cliente cadastrado!");*/

    const fornecedor = req.body;
    const result = await FornecedorRepository.create(fornecedor)
    res.json(result)
  }

  async update(req, res) {
    const idFornecedor = req.params.id;
    const fornecedor = req.body;
    const result = await FornecedorRepository.update(fornecedor, idFornecedor)
    res.json(result)
    
  }

  async delete(req, res) {
    const idFornecedor = req.params.id;
    const result = await FornecedorRepository.delete(idFornecedor)
    res.json(result)
  }
}

//padrão singleton
export default new FornecedorController();
