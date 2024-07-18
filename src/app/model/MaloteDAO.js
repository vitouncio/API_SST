import { consulta } from "../connections/connection.js";

class MaloteDAO {
  async create(malote) {
    const sql = "INSERT INTO tbl_malotes SET ?;";
    try {
      const result = await consulta(
        sql,
        malote,
        "Não foi possível cadastrar o novo malote"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async atualizarStatus(malote) {
    const atualizarStatusQuery =
      "UPDATE tbl_malotes SET status = ? WHERE id_malote = ?;";

    try {
      await consulta(
        atualizarStatusQuery,
        [malote.status, malote.id_malote],
        "Não foi possível atualizar o status do malote"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async registarMaloteProcessado(malote) {
    const sql = "INSERT INTO tbl_malotes_processados SET ?;";
    try {
      const result = await consulta(
        sql,
        malote,
        "Não foi possível cadastrar o novo malote"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_malotes WHERE id_malote=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o malote de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findByIdComNomeFunc(id) {
    const sql = `SELECT 
    m.*, 
    f.id_funcionario, 
    f.nome_funcionario,
    e.nome_cliente,
    e.id_cliente
FROM 
    tbl_malote m
JOIN 
    tbl_funcionarios f ON m.id_funcionario = f.id_funcionario
JOIN 
    tbl_cliente e ON m.id_cliente = e.id_cliente
WHERE 
    m.id_malote = ?;

    `;

    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o malote de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async receberMalote(malote) {
    const sql = "INSERT INTO tbl_recebimento_malote SET ?;";
    try {
      const result = await consulta(
        sql,
        malote,
        "Não foi possível registar o recebimento do novo malote"
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async findAllMalotesByIdCliente(id) {
    const sql = `
      SELECT 
        m.*,
        f.nome_funcionario 
      FROM
      tbl_malotes m
      JOIN 
        tbl_funcionarios f ON m.id_funcionario = f.id_funcionario 
      WHERE 
        m.id_cliente = ?;
    `;
    const result = await consulta(
      sql,
      id,
      `Não encontramos nenhum malote relcionado ao cliente de id: ${id}`
    );
    return result;
  }
}
export default new MaloteDAO();
