import { consulta } from "../database/connection.js";

class UsuarioRepository {
  //CRUD

  create(usuario) {
    const sql = "INSERT INTO tbl_usuario SET ?;";
    return consulta(sql, usuario, "oi");
  }

  async verififcarToken(tokenInput) {
    const sql = "SELECT email,token FROM tbl_usuario WHERE token=?;";

    try {
      const result = await consulta(sql, [tokenInput], `Token inválido: ${tokenInput}`);
      if (result.length === 0) {
        throw new Error("Token inválido");
      }
      console.log(tokenInput);
      console.log(result[0].token);

      if (result[0].token != tokenInput) {
        throw new Error("Token não coincide com o enviado");
      } else {
        const email = result[0].email;
        await consulta(
          "UPDATE tbl_usuario SET isContaAtivada = 1 WHERE email=?;",
          [email],
          `Não foi possível ativar o usuário: ${email}`
        );

        return email;
      }
    } catch (error) {
      console.log("não foi possivel verificar");
      console.error(error)
    }

    // Atualizar status do usuário
  }

  findAll() {
    const sql = "SELECT * FROM tbl_usuario;";
    return consulta(sql, "Não encontramos os usuário");
  }

  findById(id) {
    const sql = "SELECT * FROM tbl_usuario WHERE id_usuario=?;";
    return consulta(sql, id, `Não conseguimos encontrar o aluno de id: ${id}`);
  }

  findByEmail(email) {
    const sql = "SELECT * FROM tbl_usuario WHERE email=?;";
    return consulta(sql, id, `Não conseguimos encontrar este usuário.`);
  }

  async update(usuario, id) {
    const sql = "UPDATE tbl_usuario SET ? WHERE id_usuario=?;";
    console.log(usuario);
    return consulta(
      sql,
      [usuario, id],
      `Não foi possível atualizar o usuário de id: ${id}`
    );
  }

  delete(id) {
    const sql = "DELETE FROM tbl_usuario WHERE id_usuario=?;";
    return consulta(sql, id, `Não foi possível deletar o usuário de id: ${id}`);
  }
}

export default new UsuarioRepository();
