import TransacaoDAO from "../model/TransacaoDAO.js";
import { format } from "date-fns";
import DepositoDAO from "../model/DepositoDAO.js";
import e from "express";

class TransacaoController {
  async perfilTransacao(req, res) {
    try {
      const Transacao = await TransacaoDAO.findById(req.params.id);
      const malotes = await TransacaoDAO.findTransacaosByTransacao(
        req.params.id
      );

      res.render("Transacao/perfilTransacao", { Transacao, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  //FAÇO TABELA GUICHE??
  //const id_guiche = ??????
  async registrarTransacao(req, res, next) {
    let {
      id_cliente,
      valor,
      tipo_pagamento,
      troco,
      tipo_transacao,
      id_origem,
      id_saida,
      tipo_pagamento_troco
    } = req.body;
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const data_entrada = format(data, "dd/MM/yyyy HH:mm:ss");
    try {
      const dados_transacao = {
        id_origem,
        id_usuario,
        valor_transacao: valor,
        data_transacao: data_entrada,
        tipo_transacao,
        tipo_pagamento_transacao: tipo_pagamento,
        destino: id_saida,
      };
      const {insertId} = await TransacaoDAO.cadastrarTransacao(dados_transacao);
      const id_transacao = {insertId}


      /*faço uma thread para acessar a entradaController e atualizar o valor do campo
        id_transação??? seria top 
      */


      if (troco > 0) {
        let tipo_transacao = "Troco";
        const transacao_troco = {
          id_origem,
          id_usuario,
          valor_transacao: troco,
          data_transacao: data_entrada,
          tipo_transacao,
          tipo_pagamento_transacao: tipo_pagamento_troco,
          destino: id_saida,
        };
        if(!transacao_troco){
          throw new Error('transacao_troco vazio')
        }
        await TransacaoDAO.cadastrarTransacao(transacao_troco);
        console.log("troco registrado");
      }

      res.redirect("/homeUsuario");
    } catch (error) {
      console.log(error);
    }
  }

  async telaConfirmacaoTransacaoDeDeposito(req, res) {
    console.log(req.body);
    const id_origem = req.params.id;

    const refDeposito = await DepositoDAO.findById(id_origem);
    const {
      nome_cliente,
      id_cliente,
      numero_conta,
      numero_agencia,
      valor_deposito,
      tipo_pagamento,
      troco,
    } = req.body;

    try {
      res.render("serviços/transações/telaConfirmacaoTransacaoDeDeposito", {
        refDeposito,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaProcTransacao(req, res) {
    const id_malote = req.params.id;

    const malote = await TransacaoDAO.findByIdComNomeFunc(id_malote);
    try {
      res.render("serviços/malote/telaProcTransacao", {
        malote,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarTransacao(req, res) {
    const idFunc = req.params.id;
    const malote = await TransacaoDAO.findById(idFunc);
    try {
      res.render("serviços/malote/telaEditarTransacao", { malote });
    } catch (err) {
      console.log(err);
    }
  }

  a;

  async atualizarTransacao(req, res) {
    const Transacao = req.body;
    const TransacaoId = req.params.id;

    try {
      await TransacaoDAO.atualizarTransacao(Transacao, TransacaoId);
      console.log("atualizado");

      res.render("cliente/telaBuscarClientes.ejs");
    } catch (err) {
      console.log(err);
    }
    //ir para qual tela depois de atualizar?
  }

  async deletarTransacao(req, res) {
    const idTransacao = req.params.id;
    const Transacao = await TransacaoDAO.findById(idTransacao);
    if (!Transacao) {
      console.log(`Transacao with ID: ${idTransacao} not found.`);
      return res.status(404).json({ error: "Transacao not found" });
    }

    console.log(`Transacao found: ${JSON.stringify(Transacao)}`);

    const isTransacaoDeletado = await TransacaoDAO.delete(idTransacao);
    if (isTransacaoDeletado.affectedRows > 0) {
      console.log(
        `Transacao with ID: ${idTransacao} was successfully deleted.`
      );

      await TransacaoDAO.registrarTransacaoDeletado(Transacao);
      console.log("Transacao deletado registered in tbl_Transacao_deletado.");
      return res.json({
        message: "Transacao deleted and registered successfully",
      });
    } else {
      console.log(`Transacao with ID: ${idTransacao} not found.`);
      return res.status(404).json({ error: "Transacao not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Transacao: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Transacao" });
  }

  async buscarTransacao(req, res) {
    const id_transacao = req.params.id;
    try {
      const transacao = await TransacaoDAO.findById(id_transacao);
      res.json(transacao);
    } catch (err) {
      console.log(err);
    }
  }
}


//padrão singleton
export default new TransacaoController();
