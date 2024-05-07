import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController {
  async index(req, res) {
    const result = await AlunoRepository.findAll();
    res.json(result);
  }

  async show(req, res) {
    const id = req.params.id;
    const result = await AlunoRepository.findById(id);
    res.json(result)
  }

  async store(req, res) {
    /*listaClientes.push(req.body); //req.body = conteúdo do corpo da requisição
        res.status(201).send("Cliente cadastrado!");*/

    const aluno = req.body;
    const result = await AlunoRepository.create(aluno)
    res.json(result)
  }

  async update(req, res) {
    const idAluno = req.params.id;
    const aluno = req.body;
    const result = await AlunoRepository.update(aluno,idAluno)
    res.json(result)
    
  }

  async delete(req, res) {
    const idAluno = req.params.id;
    const result = await AlunoRepository.delete(idAluno)
    res.json(result)
  }
}

//padrão singleton
export default new AlunoController();
