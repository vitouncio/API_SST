import {consulta} from "../database/connection.js";

class UsuarioRepository {
  //CRUD

  create(usuario) {
    const sql = "INSERT INTO tbl_usuario SET ?;";
    return consulta(sql,usuario, 'oi')
  }

  findAll() {
    const sql = "SELECT * FROM tbl_usuario;";
    return consulta(sql, 'Não encontramos os usuário')

  }

  findById(id) {

    const sql = "SELECT * FROM tbl_usuario WHERE id_usuario=?;";
    return consulta(sql,id, `Não conseguimos encontrar o aluno de id: ${id}`)

  }

  update(usuario, id) {
    const sql = "UPDATE tbl_usuario SET ? WHERE id_usuario=?;";
    return consulta(sql, [usuario, id], `Não foi possível atualizar o usuário de id: ${id}`)

  }

  delete(id) {
    const sql = "DELETE FROM tbl_usuario WHERE id_usuario=?;";
    return consulta(sql,id, `Não foi possível deletar o usuário de id: ${id}`)

  }
}

export default new UsuarioRepository();
