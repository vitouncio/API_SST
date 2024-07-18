import FuncionarioDAO from "../model/FuncionarioDAO.js";

class FuncionarioController {
  async perfilFuncionario(req, res) {
    try {
      const funcionario = await FuncionarioDAO.findById(req.params.id);
      const malotes = await FuncionarioDAO.findMalotesByFuncionario(
        req.params.id
      );
      
      res.render("Funcionario/perfilFuncionario", { funcionario, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  telaCadastroFuncionario(req, res) {
    const idClientePj = req.params.id
    try {
      res.render("funcionario/telaCadFuncionario", {idClientePj});
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarFuncionario(req, res) {
    const idFunc = req.params.id
    const funcionario = await FuncionarioDAO.findById(idFunc)
    try {
      res.render("funcionario/telaEditarFuncionario", {funcionario});
    } catch (err) {
      console.log(err);
    }
  }

  async cadastrarFuncionario(req, res) {
    const funcionario = req.body;
    funcionario.id_cliente = req.params.id

    await FuncionarioDAO.create(funcionario);

    res.redirect(`/perfilCliente/${funcionario.id_cliente}`)
}

  async atualizarFuncionario(req, res) {
    const funcionario = req.body;
    const funcionarioId = req.params.id;
    await FuncionarioDAO.atualizarFuncionario(funcionario, funcionarioId);
    console.log("atualizado");

    //ir para qual tela depois de atualizar?
  }

  async deletarFuncionario(req, res) {
    const idFuncionario = req.params.id;
    const funcionario = await FuncionarioDAO.findById(idFuncionario);
    if (!funcionario) {
      console.log(`funcionario with ID: ${idFuncionario} not found.`);
      return res.status(404).json({ error: "funcionario not found" });
    }

    console.log(`funcionario found: ${JSON.stringify(funcionario)}`);

    const isFuncionarioDeletado = await FuncionarioDAO.delete(idFuncionario);
    if (isFuncionarioDeletado.affectedRows > 0) {
      console.log(
        `funcionario with ID: ${idFuncionario} was successfully deleted.`
      );
      
      await FuncionarioDAO.registrarFuncionarioDeletado(funcionario);
      console.log(
        "funcionario deletado registered in tbl_funcionario_deletado."
      );
      return res.json({
        message: "funcionario deleted and registered successfully",
      });
    } else {
      console.log(`funcionario with ID: ${idFuncionario} not found.`);
      return res.status(404).json({ error: "funcionario not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting funcionario: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the funcionario" });
  }


}

//padrão singleton
export default new FuncionarioController();
