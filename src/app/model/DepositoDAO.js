import { consulta } from "../connections/connection.js";
class DepositoDAO {
  async cadastrarDeposito(entrada) {
    const sql = "INSERT INTO tbl_depositos SET ?;";
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

  async findById(id) {
    const sql = "SELECT * FROM tbl_depositos WHERE id_deposito=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o deposito de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }
}
export default new DepositoDAO();
