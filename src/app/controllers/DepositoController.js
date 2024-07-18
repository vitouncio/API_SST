import { id } from "date-fns/locale";
import DepositoDAO from "../model/DepositoDAO.js";
import { format } from "date-fns";

class DepositoController {
  async perfilDeposito(req, res) {
    try {
      const Deposito = await DepositoDAO.findById(req.params.id);
      const malotes = await DepositoDAO.findDepositosByDeposito(req.params.id);

      res.render("Deposito/perfilDeposito", { Deposito, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  async telaCadastroDeposito(req, res) {
    try {
      res.render("serviços/depositos/telaDeposito");
    } catch (err) {
      console.log(err);
    }
  }
  

  async cadastrarDeposito(req, res,next) {
    const {nome_cliente, id_cliente, numero_conta, numero_agencia, valor_deposito, tipo_pagamento,troco} = req.body
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const data_deposito = format(data, "dd/MM/yyyy HH:mm:ss");
    try {
      const dados_deposito = {
        id_usuario,
        id_cliente,
        valor_deposito,
        tipo_pagamento,
        data_deposito,
      };
       const {insertId} = await DepositoDAO.cadastrarDeposito(dados_deposito);
       res.render("serviços/transações/telaConfirmacaoTransacaoDeDeposito", {nome_cliente, id_cliente, numero_conta, numero_agencia, valor_deposito, tipo_pagamento, insertId, troco });

    } catch (error) {
      console.log(error);
    }
  }

  async deletarDeposito(req, res) {
    const idDeposito = req.params.id;
    const Deposito = await DepositoDAO.findById(idDeposito);
    if (!Deposito) {
      console.log(`Deposito with ID: ${idDeposito} not found.`);
      return res.status(404).json({ error: "Deposito not found" });
    }

    console.log(`Deposito found: ${JSON.stringify(Deposito)}`);

    const isDepositoDeletado = await DepositoDAO.delete(idDeposito);
    if (isDepositoDeletado.affectedRows > 0) {
      console.log(`Deposito with ID: ${idDeposito} was successfully deleted.`);

      await DepositoDAO.registrarDepositoDeletado(Deposito);
      console.log("Deposito deletado registered in tbl_Deposito_deletado.");
      return res.json({
        message: "Deposito deleted and registered successfully",
      });
    } else {
      console.log(`Deposito with ID: ${idDeposito} not found.`);
      return res.status(404).json({ error: "Deposito not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Deposito: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Deposito" });
  }
}

//padrão singleton
export default new DepositoController();
