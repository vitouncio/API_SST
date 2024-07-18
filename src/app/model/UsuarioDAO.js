import { consulta } from "../connections/connection.js";

class UsuarioDAO {
  //CRUD

  create(usuario) {
    const sql = "INSERT INTO tbl_usuario SET ?;";
    return consulta(sql, usuario, "oi");
  }

  async verififcarToken(tokenInput) {
    const sql = "SELECT email_usuario,token FROM tbl_usuario WHERE token=?;";

    try {
      const result = await consulta(
        sql,
        [tokenInput],
        `Token inválido: ${tokenInput}`
      );
      if (result.length === 0) {
        throw new Error("Token inválido");
      }
      console.log(tokenInput);
      console.log(result[0].token);

      if (result[0].token != tokenInput) {
        throw new Error("Token não coincide com o enviado");
      } else {
        const email = result[0].email_usuario;
        await consulta(
          "UPDATE tbl_usuario SET isContaAtivada = 1 WHERE email_usuario=?;",
          [email],
          `Não foi possível ativar o usuário: ${email}`
        );

        return email;
      }
    } catch (error) {
      console.log("não foi possivel verificar");
      console.error(error);
    }

    // Atualizar status do usuário
  }

  findAll() {
    const sql = "SELECT * FROM tbl_usuario;";
    return consulta(sql, "Não encontramos os usuário");
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_usuario WHERE id_usuario=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o aluno de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findByEmail(email) {
    const sql = "SELECT * FROM tbl_usuario WHERE email_usuario=?;";
    const usuario = await consulta(
      sql,
      email,
      `Não conseguimos encontrar este usuário.`
    );
    return usuario;
  }

  async update(usuario, id) {
    const sql = "UPDATE tbl_usuario SET ? WHERE id_usuario=?;";
    try {
      await consulta(
        sql,
        [usuario, id],
        `Não foi possível atualizar o usuário de id: ${id}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    const sql = "DELETE FROM tbl_usuario WHERE id_usuario=?;";
    try {
      await consulta(
        sql,
        id,
        `Não foi possível deletar o usuário de id: ${id}`
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UsuarioDAO();
