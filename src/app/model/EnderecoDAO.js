import {consulta} from "../connections/connection.js";

class EnderecoDAO {
  //CRUD

  create(endereco) {
    const sql = "INSERT INTO tbl_endereco SET ?";
    return consulta(sql, endereco, "Não foi possível cadastrar o novo endereço")
  }


  findAll() {
    const sql = "SELECT * FROM tbl_endereco;";
    return consulta(sql, 'Não encontramos os endereços')

  }

  findById(id) {
    //observar que :id é um parâmetro
    //res.json(buscarenderecoPorId(req.params.id)); //req.params.id incida que será retornado o parametro da requisição (id)

    const sql = "SELECT * FROM tbl_endereco WHERE id_endereco=?;";
    return consulta(sql,id, `Não conseguimos encontrar o endereco de id: ${id}`)

  }

  update(endereco, id) {
    const sql = "UPDATE tbl_endereco SET ? WHERE id_endereco=?;";
    return consulta(sql, [endereco, id], `Não foi possível atualizar o endereco de id: ${id}`)

  }

  delete(id) {
    const sql = "DELETE FROM tbl_endereco WHERE id_endereco=?;";
    return consulta(sql,id, `Não foi possível deletar o endereco de id: ${id}`)

  }
}

export default new EnderecoDAO();
