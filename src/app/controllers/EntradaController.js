import EntradaDAO from "../model/EntradaDAO.js";
import { format } from "date-fns";

class EntradaController {
  async perfilEntrada(req, res) {
    try {
      const Entrada = await EntradaDAO.findById(req.params.id);
      const malotes = await EntradaDAO.findEntradasByEntrada(req.params.id);

      res.render("Entrada/perfilEntrada", { Entrada, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  //FAÇO TABELA GUICHE??
  //const id_guiche = ??????
  async registrarEntrada(req, res, next) {
    console.log(req.body);
    const { id_cliente, valor_entrada, tipo_pagamento, tipo_transacao } =
      req.body;
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const data_entrada = format(data, "dd/MM/yyyy HH:mm:ss");
    try {
      const dados_entrada = {
        id_usuario,
        id_cliente,
        valor_entrada,
        data_entrada,
        tipo_entrada: tipo_transacao,
        tipo_pagamento,
      };
      await EntradaDAO.create(dados_entrada);

      next();
    } catch (error) {
      console.log(error);
    }
  }

  async telaProcEntrada(req, res) {
    const id_malote = req.params.id;

    const malote = await EntradaDAO.findByIdComNomeFunc(id_malote);
    try {
      res.render("serviços/malote/telaProcEntrada", {
        malote,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarEntrada(req, res) {
    const idFunc = req.params.id;
    const malote = await EntradaDAO.findById(idFunc);
    try {
      res.render("serviços/malote/telaEditarEntrada", { malote });
    } catch (err) {
      console.log(err);
    }
  }

  a;

  async atualizarEntrada(req, res) {
    const Entrada = req.body;
    const EntradaId = req.params.id;

    try {
      await EntradaDAO.atualizarEntrada(Entrada, EntradaId);
      console.log("atualizado");

      res.render("cliente/telaBuscarClientes.ejs");
    } catch (err) {
      console.log(err);
    }
    //ir para qual tela depois de atualizar?
  }

  async deletarEntrada(req, res) {
    const idEntrada = req.params.id;
    const Entrada = await EntradaDAO.findById(idEntrada);
    if (!Entrada) {
      console.log(`Entrada with ID: ${idEntrada} not found.`);
      return res.status(404).json({ error: "Entrada not found" });
    }

    console.log(`Entrada found: ${JSON.stringify(Entrada)}`);

    const isEntradaDeletado = await EntradaDAO.delete(idEntrada);
    if (isEntradaDeletado.affectedRows > 0) {
      console.log(`Entrada with ID: ${idEntrada} was successfully deleted.`);

      await EntradaDAO.registrarEntradaDeletado(Entrada);
      console.log("Entrada deletado registered in tbl_Entrada_deletado.");
      return res.json({
        message: "Entrada deleted and registered successfully",
      });
    } else {
      console.log(`Entrada with ID: ${idEntrada} not found.`);
      return res.status(404).json({ error: "Entrada not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Entrada: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Entrada" });
  }
  async buscarEntrada(req, res) {
    const id_entrada = req.params.id;
    try {
      const entrada = await EntradaDAO.findById(id_entrada);
      res.json(entrada);
    } catch (err) {
      console.log(err);
    }
  }
}

//padrão singleton
export default new EntradaController();
