import { consulta } from "../connections/connection.js";

class ClienteDAO {
  //CRUD

  async create(cliente) {
    const sql = "INSERT INTO tbl_clientes SET ?;";
    try {
      return await consulta(
        sql,
        cliente,
        "Não foi possível cadastrar o novo cliente"
      );
    } catch (err) {
      console.log(err);
    }
  }
  async atualizarCliente(cliente, id) {
    const sql = "UPDATE tbl_clientes SET ? WHERE id_cliente=?;";
    const clienteAtt = await consulta(
      sql,
      [cliente, id],
      `Não foi possível atualizar o cliente de id: ${id}`
    );
  }
  async atualizarEndereco(endereco, id) {
    const sql = "UPDATE tbl_endereco SET ? WHERE id_endereco=?;";
    await consulta(
      sql,
      [endereco, id],
      `Não foi possível atualizar o endereco de id: ${id}`
    );
  }


  async delete(id) {
    const sql = "DELETE FROM tbl_clientes WHERE id_cliente=?;";
    return await consulta(sql, id, `Não foi possível deletar o cliente de id: ${id}`);
  }

  async registrarClienteDeletado(cliente) {
    const sql = "INSERT INTO tbl_clientes_deletados SET ?;";
    return await consulta(
      sql,
      cliente,
      `Não foi possível registrar o cliente deletado`
    );
  }
  async criarEndereco(endereco) {
    const sql = "INSERT INTO tbl_endereco SET ?;";
    return await consulta(sql, endereco, "Não consegui salvar o endereco");
  }

  async findByIdWithEndereco(id) {
    const sql = `
    SELECT c.*, e.*
  FROM tbl_clientes c
  LEFT JOIN tbl_endereco e ON c.id_endereco = e.id_endereco
  WHERE c.id_cliente = ?;
  `;
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o cliente de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async findAll() {
    const sql = "SELECT * FROM tbl_clientes;";
    return await consulta(sql, "Não encontramos os clientes");
  }

  async findAllClientesComContaCaixa() {
    const sql = `SELECT 
        c.*,
        cc.* 
      FROM
      tbl_clientes c
      JOIN 
        tbl_contas_caixa cc ON c.id_cliente = cc.id_cliente
        WHERE c.id_cliente != -1`
    return await consulta(sql, "Não encontramos os clientes");
  }

  async findById(id) {
    const sql = "SELECT * FROM tbl_clientes WHERE id_cliente=?;";
    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o cliente de email: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }



  async findFuncionariosOfCliente(id){
    const sql = "SELECT * FROM tbl_funcionarios WHERE id_cliente=?;"
    const result = await consulta(sql,id,`Não encontramos nenhum funcionário relcionado ao cliente de id: ${id}`)
    return result;
    
  } 

  
  
}

export default new ClienteDAO();






