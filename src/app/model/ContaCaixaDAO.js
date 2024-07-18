import { consulta } from "../connections/connection.js";


class ContaCaixaDAO {

    async create(conta) {
        const sql = "INSERT INTO tbl_contas_caixa SET ?;";
        try {
          const result = await consulta(
            sql,
            conta,
            "Não foi possível cadastrar o novo conta caixa"
          );
          console.log(result)
          
        } catch (err) {
          console.log(err);
        }
      }

}
export default new ContaCaixaDAO();
