import { consulta } from "../../database/connection.js";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4co//", salt);

class LoginRepository {

  async validarLogin(email, senha) {
    try {
      const sql = "SELECT * FROM tbl_usuario WHERE email=?;";
      resBusca = consulta(
        sql,
        email,
        `Não conseguimos encontrar este usuário.`
      );
      if (resBusca.lenght > 0) {
        const usuario = resBusca[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (senhaValida) {
          return { success: true, usuario };
        } else {
          return { success: false, message: "Senha incorreta." };
        }
      } else {
        return { success: false, message: "Usuário não encontrado." };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  findAll() {
    const sql = "SELECT * FROM tbl_usuario;";
    return consulta(sql, "Não encontramos nenhum dado");
  }
}
export default new LoginRepository();
