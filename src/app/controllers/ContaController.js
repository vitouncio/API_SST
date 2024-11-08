import ContaDAO from "../model/ContaDAO.js";
import ClienteDAO from "../model/ClienteDAO.js";
import FuncionarioDAO from "../model/FuncionarioDAO.js";
import { format } from "date-fns";

class ContaController {
  async perfilConta(req, res) {
    try {
      const Conta = await ContaDAO.findById(req.params.id);
      const malotes = await ContaDAO.findContasByConta(req.params.id);

      res.render("Conta/perfilConta", { Conta, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  async telaRecebimentoDeConta(req, res) {
    try {
      res.render("serviços/conta/telaRecebimentoDeConta");
    } catch (err) {
      console.log(err);
    }
  }

  async telaProcConta(req, res) {
    const id_malote = req.params.id;

    const malote = await ContaDAO.findByIdComNomeFunc(id_malote);
    try {
      res.render("serviços/malote/telaProcConta", {
        malote,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarConta(req, res) {
    const idFunc = req.params.id;
    const malote = await ContaDAO.findById(idFunc);
    try {
      res.render("serviços/malote/telaEditarConta", { malote });
    } catch (err) {
      console.log(err);
    }
  }

  async registrarPagamento(req, res) {
    const { contas, id_cliente, observacao } = req.body;
    const id_usuario = req.session.usuario.usuario.id_usuario;

    //registrando local exato do pagamento
    const data = new Date();
    const data_pagamento = format(data, "dd/MM/yyyy HH:mm:ss");

    const resultPagamento = await ContaDAO.createPagamento({data_pagamento});
      const id_pagamento = resultPagamento.insertId;


    try {
      for (const conta of contas) {
        const novaConta = {
          afk_id_pagamento: id_pagamento,
          banco: conta.banco,
          segmento: conta.segmento,
          valor: conta.valor,
          codigo: conta.codigo,
          data_vencimento: conta.data_vencimento,
          observacao: observacao,
          id_cliente: id_cliente,
          id_usuario: id_usuario // Adicionar o ID do usuário logado
        };
        console.log(novaConta);
        
        // Salvar o conta no banco de dados
        await ContaDAO.createConta(novaConta);
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar contas", error });
      console.log(error)
    }
  }

  async atualizarConta(req, res) {
    const Conta = req.body;
    const ContaId = req.params.id;
    
    try{
      await ContaDAO.atualizarConta(Conta, ContaId);
    console.log("atualizado");

    res.render("cliente/telaBuscarClientes.ejs")
    }catch(err){
      console.log(err)
    }
    //ir para qual tela depois de atualizar?
  }

  async deletarConta(req, res) {
    const idConta = req.params.id;
    const Conta = await ContaDAO.findById(idConta);
    if (!Conta) {
      console.log(`Conta with ID: ${idConta} not found.`);
      return res.status(404).json({ error: "Conta not found" });
    }

    console.log(`Conta found: ${JSON.stringify(Conta)}`);

    const isContaDeletado = await ContaDAO.delete(idConta);
    if (isContaDeletado.affectedRows > 0) {
      console.log(`Conta with ID: ${idConta} was successfully deleted.`);

      await ContaDAO.registrarContaDeletado(Conta);
      console.log("Conta deletado registered in tbl_Conta_deletado.");
      return res.json({
        message: "Conta deleted and registered successfully",
      });
    } else {
      console.log(`Conta with ID: ${idConta} not found.`);
      return res.status(404).json({ error: "Conta not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Conta: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Conta" });
  }
}

//padrão singleton
export default new ContaController();
