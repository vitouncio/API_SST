import {consulta} from "../database/connection.js";

class AlunoRepository {
  //CRUD

  create(aluno) {
    const sql = "INSERT INTO tbl_aluno SET ?;";
    return consulta(sql,aluno, "Não foi possível cadastrar o novo aluno")
  }

  findAll() {
    const sql = "SELECT * FROM tbl_aluno;";
    return consulta(sql, 'Não encontramos os alunos')

  }

  findById(id) {
    //observar que :id é um parâmetro
    //res.json(buscarClientePorId(req.params.id)); //req.params.id incida que será retornado o parametro da requisição (id)

    const sql = "SELECT * FROM tbl_aluno WHERE id_aluno=?;";
    return consulta(sql,id, `Não conseguimos encontrar o aluno de id: ${id}`)

  }

  update(aluno, id) {
    const sql = "UPDATE tbl_aluno SET ? WHERE id_aluno=?;";
    return consulta(sql, [aluno, id], `Não foi possível atualizar o aluno de id: ${id}`)

  }

  delete(id) {
    const sql = "DELETE FROM tbl_aluno WHERE id_aluno=?;";
    return consulta(sql,id, `Não foi possível deletar o aluno de id: ${id}`)

  }
}

export default new AlunoRepository();
