import { consulta } from "../connections/connection.js";

class SaqueDAO {
  async registrarSaque(saque) {
    const sql = "INSERT INTO tbl_saques SET ?;";
    try {
      const result = await consulta(
        sql,
        saque,
        "Não foi possível cadastrar o novo Saque"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_saques WHERE id_entrada=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o Saque de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findAll() {
    const sql = "SELECT * FROM tbl_saques;";
    return await consulta(sql, "Não encontramos os clientes");
  }

  async findHistorico() {
    const sql = `SELECT 
    tbl_saques.id_saque,
    tbl_clientes.nome_cliente,
    tbl_contas_caixa.numero_agencia,
    tbl_contas_caixa.numero_conta,
    tbl_saques.valor_saque,
    tbl_saques.data_saque
FROM 
    tbl_saques
JOIN 
    tbl_clientes ON tbl_saques.id_cliente = tbl_clientes.id_cliente
JOIN 
    tbl_contas_caixa ON tbl_saques.id_cliente = tbl_contas_caixa.id_cliente;

` ;
    return await consulta(sql, "Não encontramos os clientes");
  }

  
  async findAllSaquesByIdCliente(id) {
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
      `Não encontramos nenhum Saque relcionado ao cliente de id: ${id}`
    );
    return result;
  }
}
export default new SaqueDAO();
