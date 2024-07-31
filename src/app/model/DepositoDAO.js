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

  async findHistorico() {
    const sql = `SELECT 
        tbl_depositos.id_deposito,
        tbl_clientes.nome_cliente,
        COALESCE(tbl_contas_caixa.numero_agencia, '--') AS numero_agencia,
        COALESCE(tbl_contas_caixa.numero_conta, '--') AS numero_conta,
        tbl_depositos.valor_deposito,
        tbl_depositos.data_deposito
    FROM 
        tbl_depositos
    JOIN 
        tbl_clientes ON tbl_depositos.id_cliente = tbl_clientes.id_cliente
    LEFT JOIN 
        tbl_contas_caixa ON tbl_depositos.id_cliente = tbl_contas_caixa.id_cliente;` ;
    return await consulta(sql, "Histórico impossível de ser recuperado");
  }

}
export default new DepositoDAO();
