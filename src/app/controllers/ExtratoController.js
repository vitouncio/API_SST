import ExtratoDAO from "../model/ExtratoDAO.js";

class ExtratoController {
  async registrarEmExtrato(req, res) {
    const result = await ExtratoRepository.findAll();
    res.json(result);
  }

  async telaExtrato(req,res){
    try{
        res.render("serviços/extrato/telaExtrato.ejs")
    }catch(error){
        console.log(error);
    }
  }
   async buscarHistoricoExtratos(req,res){
    try{
        const historico = await ExtratoDAO.findAll()
        res.json(historico)
    }catch(error){
        console.log(error)
    }
   }
  
}

export default new ExtratoController();
