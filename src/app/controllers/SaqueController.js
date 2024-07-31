import SaqueDAO from "../model/SaqueDAO.js";
import { format } from "date-fns";

class SaqueController {
  async telaSaque(req, res) {
    try {
      res.render("serviços/saque/telaSaque");
    } catch (err) {
      console.log(err);
    }
  }
  async telaCadSaque(req, res) {
    try {
      res.render("serviços/saque/telaCadSaque");
    } catch (err) {
      console.log(err);
    }
  }

  async buscarHistoricoDeSaques(req,res){
    try {
      const saques = await SaqueDAO.findHistorico();
      res.json(saques)
    } catch (err) {
      console.log(err);
    }
  }
  async telaConfirmacaoDeSaque(req, res) {
    const dados_saque = req.body
    console.log(dados_saque)
    try {
      res.render("serviços/saque/telaConfirmacaoDeSaque", {dados_saque});
    } catch (err) {
      console.log(err);
    }
  }
  

  async registrarSaque(req,res,next) {
    const {id_cliente, valor} = req.body;
    const id_usuario = req.session.usuario.usuario.id_usuario;
    const data = new Date();
    const dataFormatada = format(data, "dd/MM/yyyy HH:mm:ss");

    let dados_saque = {id_usuario, id_cliente, valor_saque: valor,data_saque: dataFormatada}

    try {

      
      await SaqueDAO.registrarSaque(dados_saque);

      next()

    } catch (err) {
      console.log(err);
    }
  }
}

//padrão singleton
export default new SaqueController();
