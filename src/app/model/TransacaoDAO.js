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

  async findById(id) {
    const sql = `
           SELECT
    t.*,                    -- Todos os campos de tbl_transferencia1
    d.id_cliente,           -- ID do cliente da tbl_deposito
    
    c.*,                    -- Todos os campos da tbl_cliente
    cc.*                    -- Todos os campos da tbl_conta_caixa
FROM
    tbl_transacoes t
JOIN
    tbl_depositos d ON t.id_origem = d.id_deposito
JOIN
    tbl_clientes c ON d.id_cliente = c.id_cliente
JOIN
    tbl_contas_caixa cc ON c.id_conta_caixa = cc.id_conta;

        `;
    const result = await consulta(
      sql,
      [id],
      `Não conseguimos encontrar o Transacao de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }
}
export default new TransacaoDAO();
