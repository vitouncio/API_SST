import { consulta } from "../connections/connection.js";

class FuncionarioDAO {
  //CRUD

  async create(funcionario) {
    const sql = "INSERT INTO tbl_funcionarios SET ?;";
    try {
      return await consulta(
        sql,
        funcionario,
        "Não foi possível cadastrar o novo funcionario"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async atualizarFuncionario(funcionario, id) {
    const sql = "UPDATE tbl_funcionarios SET ? WHERE id_funcionario=?;";
    const funcionarioAtt = await consulta(
      sql,
      [funcionario, id],
      `Não foi possível atualizar o funcionario de id: ${id}`
    );
  }

  delete(id) {
    const sql = "DELETE FROM tbl_funcionarios WHERE id_funcionario=?;";
    return consulta(
      sql,
      id,
      `Não foi possível deletar o funcionario de id: ${id}`
    );
  }

  registrarFuncionarioDeletado(funcionario) {
    const sql = "INSERT INTO tbl_funcionarios_deletados SET ?;";
    return consulta(
      sql,
      funcionario,
      `Não foi possível registrar o funcionario deletado`
    );
  }

  async findAll() {
    const sql = "SELECT * FROM tbl_funcionarios;";
    return await consulta(sql, "Não encontramos os funcionarios");
  }
  
  async findAllByIdCliente(id) {
    const sql = "SELECT * FROM tbl_funcionarios WHERE id_cliente=?;";
    return await consulta(sql,[id], "Não encontramos os funcionarios");
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_funcionarios WHERE id_funcionario=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o funcionario de email: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findMalotesByfuncionario(id) {
    const sql = "SELECT * FROM tbl_malote WHERE id_funcionario=?;";
    const result = await consulta(
      sql,
      id,
      `Não encontramos nenhum malote relcionado ao funcionario de id: ${id}`
    );

    return result;
  }

 
  async atualizarEndereco(endereco, id) {
    const sql = "UPDATE tbl_endereco SET ? WHERE id_endereco=?;";
    const funcionarioAtt = await consulta(
      sql,
      [endereco, id],
      `Não foi possível atualizar o endereco de id: ${id}`
    );
  }

  

  async criarEndereco(endereco) {
    const sql = "INSERT INTO tbl_endereco SET ?;";
    return await consulta(sql, endereco, "Não consegui salvar o endereco");
  }

  async findByIdWithEndereco(id) {
    const sql = `
    SELECT c.*, e.*
  FROM tbl_funcionarios c
  LEFT JOIN tbl_endereco e ON c.id_endereco_funcionario = e.id_endereco
  WHERE c.id_funcionario = ?;
  `;
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o funcionario de id: ${id}`
    );
    console.log(result);
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }
}

export default new FuncionarioDAO();
