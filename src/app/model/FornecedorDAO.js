import {consulta} from "../connections/connection.js";

class fornecedorRepository {
  //CRUD

  create(fornecedor) {
    const sql = "INSERT INTO tbl_fornecedor SET ?;";
    return consulta(sql,fornecedor, 'Não foi possível criar o fornecedor')
  }

  findAll() {
    const sql = "SELECT * FROM tbl_fornecedor;";
    return consulta(sql, 'Não encontramos os fornecedor')

  }

  findById(id) {

    const sql = "SELECT * FROM tbl_fornecedor WHERE id_fornecedor=?;";
    return consulta(sql,id, `Não conseguimos encontrar o fornecedor de id: ${id}`)

  }

  update(fornecedor, id) {
    const sql = "UPDATE tbl_fornecedor SET ? WHERE id_fornecedor=?;";
    return consulta(sql, [fornecedor, id], `Não foi possível atualizar o fornecedor de id: ${id}`)

  }

  delete(id) {
    const sql = "DELETE FROM tbl_fornecedor WHERE id_fornecedor=?;";
    return consulta(sql,id, `Não foi possível deletar o fornecedor de id: ${id}`)

  }
}

export default new fornecedorRepository();
