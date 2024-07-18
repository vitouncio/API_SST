import ContaCaixaDAO from "../model/ContaCaixaDAO.js";
class ContaCaixaController {
  async cadastrarContaCaixa(req, res, next) {
    const dados = req.body;
    const { id_cliente, numero_conta, numero_agencia } = req.body;
    let tipo_conta;
    try {
      if (id_cliente === "-1") {
        next();
      } else if (dados.tipo_conta === "PJ") {
        tipo_conta = "PJ";
        const contaPJ = {
          id_cliente,
          tipo_conta,
          numero_agencia,
          numero_conta,
        };
        console.log("pj");

        await ContaCaixaDAO.create(contaPJ);
        next();
      } else if (dados.tipo_conta === "PF") {
        tipo_conta = "PF";
        const contaPF = {
          id_cliente,
          tipo_conta,
          numero_agencia,
          numero_conta,
        };
        console.log("pf");

        await ContaCaixaDAO.create(contaPF);
        next();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

//padrão singleton
export default new ContaCaixaController();
