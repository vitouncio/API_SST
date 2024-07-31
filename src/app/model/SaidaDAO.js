import { consulta } from "../connections/connection.js";

class SaidaDAO {
  async registrarSaida(saida) {
    const sql = "INSERT INTO tbl_saidas SET ?;";
    try {
      const result = await consulta(
        sql,
        saida,
        "Não foi possível cadastrar o novo Saida"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_saidas WHERE id_entrada=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o Saida de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }


  
  async findAllSaidasByIdCliente(id) {
    const sql = `
      SELECT 
        m.*, 
        f.nome_funcionario 
      FROM 
        tbl_recebimento_ m
      JOIN 
        tbl_funcionarios f 
      ON 
        m.id_funcionario = f.id_funcionario 
      WHERE 
        m.id_cliente = ?;
    `;
    const result = await consulta(
      sql,
      id,
      `Não encontramos nenhum Saida relcionado ao cliente de id: ${id}`
    );
    return result;
  }
}
export default new SaidaDAO();
