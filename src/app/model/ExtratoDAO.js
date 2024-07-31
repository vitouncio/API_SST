import { consulta } from "../connections/connection.js";

class ExtratoDAO {
  async registrarExtrato(extrato) {
    const sql = "INSERT INTO tbl_extrato SET ?;";
    try {
      const result = await consulta(
        sql,
        extrato,
        "Não foi possível cadastrar o novo Extrato"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_extrato WHERE id_extrato=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o Extrato de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findAll() {
    const sql = "SELECT * FROM tbl_extrato;";
    return await consulta(sql, "Não encontramos os clientes");
  }


  
 
}
export default new ExtratoDAO();
