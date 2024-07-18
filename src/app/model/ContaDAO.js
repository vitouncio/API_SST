import { consulta } from "../connections/connection.js";

class ContaDAO {
  async create(conta) {
    const sql = "INSERT INTO tbl_contas SET ?;";
    try {
      const result = await consulta(
        sql,
        conta,
        "Não foi possível cadastrar o novo conta"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_contas WHERE id_conta=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o conta de id: ${id}`
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
    e.nome_cliente
FROM 
    tbl_contas m
JOIN 
    tbl_funcionarios f ON m.id_funcionario = f.id_funcionario
JOIN 
    tbl_cliente e ON m.id_cliente = e.id_cliente
WHERE 
    m.id_conta = ?;

    `;

    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o conta de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async receberConta(conta) {
    const sql = "INSERT INTO tbl_recebimento_conta SET ?;";
    try {
      const result = await consulta(
        sql,
        conta,
        "Não foi possível registar o recebimento do novo conta"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async findAllContasByIdCliente(id) {
    const sql = `
      SELECT 
        m.*, 
        f.nome_funcionario 
      FROM 
        tbl_recebimento_conta m
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
      `Não encontramos nenhum conta relcionado ao cliente de id: ${id}`
    );
    return result;
  }
}
export default new ContaDAO();
