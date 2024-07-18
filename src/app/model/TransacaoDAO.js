import { consulta } from "../connections/connection.js";
class TransacaoDAO {
 
    async cadastrarTransacao(entrada) {
        const sql = "INSERT INTO tbl_transacoes SET ?;";
        try {
          const result = await consulta(
            sql,
            entrada,
            "Não foi possível cadastrar o novo Entrada"
          );
          return result;
        } catch (err) {
          console.log(err);
        }
      }

}
export default new TransacaoDAO();
