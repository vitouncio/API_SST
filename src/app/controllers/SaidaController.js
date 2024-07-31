import SaidaDAO from "../model/SaidaDAO.js";
import { format } from "date-fns";

class SaidaController {
  async perfilSaida(req, res) {
    try {
      const Saida = await SaidaDAO.findById(req.params.id);
      const malotes = await SaidaDAO.findSaidasBySaida(req.params.id);

      res.render("saida/perfilSaida", { saida, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  //FAÇO TABELA GUICHE??
  //const id_guiche = ??????
  async registrarSaidaTroco(req, res, next) {
    let { id_cliente, tipo_pagamento_troco, troco } = req.body;
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const data_saida = format(data, "dd/MM/yyyy HH:mm:ss");
    try {
      if (troco > 0) {
       let tipo_transacao = "Troco"
        const dados_saida = {
          id_usuario,
          id_cliente,
          valor_saida: troco,
          data_saida,
          tipo_saida: tipo_transacao,
          tipo_pagamento_saida: tipo_pagamento_troco
        };
        const result = await SaidaDAO.registrarSaida(dados_saida);
        req.body.id_saida = result.insertId
      }
      next()
    } catch (error) {
      console.log(error);
    }
  }
  async registrarSaidaDeposito(req, res, next) {
    const { id_cliente, valor ,tipo_pagamento} = req.body;
    let tipo_saida = "Depósito"
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const data_saida = format(data, "dd/MM/yyyy HH:mm:ss");
    try {
        const dados_saida = {
          id_usuario,
          id_cliente,
          valor_saida: valor,
          data_saida,
          tipo_saida,
          tipo_pagamento_saida: tipo_pagamento
        };
        const result = await SaidaDAO.registrarSaida(dados_saida);
        req.body.id_saida = result.insertId
      
      req.body.tipo_transacao = tipo_saida
      next()
    } catch (error) {
      console.log(error);
    }
  }

  async registrarSaida(req,res,next){
    const {id_cliente, valor, tipo, tipo_pagamento} = req.body
    const id_usuario = req.session.usuario.usuario.id_usuario
    const data = new Date();
    const dataFormatada = format(data, "dd/MM/yyyy HH:mm:ss");
    try{
      const dados_saida = {id_usuario, id_cliente, valor, data_saida: dataFormatada, tipo_saida: tipo, tipo_pagamento_saida: tipo_pagamento }
      await SaidaDAO.registrarSaida(dados_saida)

      res.redirect("/homeUsuario");
    }catch(err){
      console.log(err)
    }
  }


  async telaProcSaida(req, res) {
    const id_malote = req.params.id;

    const malote = await SaidaDAO.findByIdComNomeFunc(id_malote);
    try {
      res.render("serviços/malote/telaProcSaida", {
        malote,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarSaida(req, res) {
    const idFunc = req.params.id;
    const malote = await SaidaDAO.findById(idFunc);
    try {
      res.render("serviços/malote/telaEditarSaida", { malote });
    } catch (err) {
      console.log(err);
    }
  }

  a;

  async atualizarSaida(req, res) {
    const saida = req.body;
    const saidaId = req.params.id;

    try {
      await SaidaDAO.atualizarSaida(saida, saidaId);
      console.log("atualizado");

      res.render("cliente/telaBuscarClientes.ejs");
    } catch (err) {
      console.log(err);
    }
    //ir para qual tela depois de atualizar?
  }

  async deletarSaida(req, res) {
    const idSaida = req.params.id;
    const saida = await SaidaDAO.findById(idSaida);
    if (!saida) {
      console.log(`Saida with ID: ${idSaida} not found.`);
      return res.status(404).json({ error: "Saida not found" });
    }

    console.log(`Saida found: ${JSON.stringify(saida)}`);

    const isSaidaDeletado = await SaidaDAO.delete(idSaida);
    if (isSaidaDeletado.affectedRows > 0) {
      console.log(`Saida with ID: ${idSaida} was successfully deleted.`);

      await SaidaDAO.registrarSaidaDeletado(saida);
      console.log("Saida deletado registered in tbl_Saida_deletado.");
      return res.json({
        message: "Saida deleted and registered successfully",
      });
    } else {
      console.log(`Saida with ID: ${idSaida} not found.`);
      return res.status(404).json({ error: "Saida not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Saida: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Saida" });
  }
}

//padrão singleton
export default new SaidaController();
