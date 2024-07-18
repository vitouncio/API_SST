import MaloteDAO from "../model/MaloteDAO.js";
import ContaDAO from "../model/ContaDAO.js";
import FuncionarioDAO from "../model/FuncionarioDAO.js";
import { format } from "date-fns";

class MaloteController {
  async perfilMalote(req, res) {
    try {
      const Malote = await MaloteDAO.findById(req.params.id);
      const malotes = await MaloteDAO.findMalotesByMalote(req.params.id);

      res.render("Malote/perfilMalote", { Malote, malotes });
    } catch (err) {
      console.log(err);
    }
  }

  async telaCadastroMalote(req, res) {
    const idClientePj = req.params.id;
    const funcionarios = await FuncionarioDAO.findAllByIdCliente(idClientePj);
    try {
      res.render("serviços/malote/telaCadMalote", {
        idClientePj,
        funcionarios,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaProcMalote(req, res) {
    const id_malote = req.params.id;

    const malote = await MaloteDAO.findByIdComNomeFunc(id_malote);
    try {
      res.render("serviços/malote/telaProcMalote", {
        malote,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarMalote(req, res) {
    const idFunc = req.params.id;
    const malote = await MaloteDAO.findById(idFunc);
    try {
      res.render("serviços/malote/telaEditarMalote", { malote });
    } catch (err) {
      console.log(err);
    }
  }

  async cadastrarMalote(req, res) {
    try {
      const {
        id_funcionario,
        valor_declarado,
        valor_pix_declarado,
        valor_cheque_declarado,
        valor_dinheiro_declarado,
        status,
      } = req.body;
      const id_cliente = req.params.id;
      const usuario = req.session.usuario;
      const id_usuario = usuario.usuario.id_usuario;
      const novoMalote = {
        id_cliente,
        id_usuario_cad_malote: id_usuario,
        id_funcionario,
        valor_declarado,
        valor_pix_declarado,
        valor_cheque_declarado,
        valor_dinheiro_declarado,
        status,
      };

      const maloteCad = await MaloteDAO.create(novoMalote);
      const id_malote = maloteCad.insertId;
      if (maloteCad) {
        const data = new Date();
        const dataFormatada = format(data, "dd/MM/yyyy HH:mm:ss");
        const dadosRecebimento = {
          id_malote,
          id_cliente,
          id_funcionario,
          id_usuario,
          data_recebimento_malote: dataFormatada,
        };

        await MaloteDAO.receberMalote(dadosRecebimento);

        res.redirect(`/perfilCliente/${id_cliente}`);
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  }

   async getMalotesPendentes(req, res) {
    try {
        const malotes = await MaloteDAO.findMalotesByStatus('pendente');
        res.json(malotes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar malotes pendentes' });
    }
}

 async getMalotesProcessados(req, res) {
    try {
        const malotes = await MaloteDAO.findMalotesByStatus('processado');
        res.json(malotes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar malotes processados' });
    }
}

 async getMalotesDevolvidos(req, res) {
    try {
        const malotes = await MaloteDAO.findMalotesByStatus('devolvido');
        res.json(malotes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar malotes devolvidos' });
    }
}

  async processarMalote(req, res) {
    const id_malote = req.params.id;
    const { id_cliente, id_funcionario, troco, observacao } = req.body;
    const id_usuario_processamento = req.session.usuario.usuario.id_usuario;
    const status = "processado";

    try {
      const data = new Date();
      const data_processamento = format(data, "dd/MM/yyyy HH:mm:ss");
      const malote = {
        id_malote,
        id_cliente,
        id_funcionario,
        id_usuario_processamento,
        status,
        troco,
        observacao,
        data_processamento,
      };

      await MaloteDAO.atualizarStatus(malote);
      await MaloteDAO.registarMaloteProcessado(malote);

      // Redirecionar o cliente
      res.status(200).json({ success: true, redirectUrl: `/perfilCliente/${id_cliente}` });

    } catch (err) {
      console.log(err);

      // Enviar mensagem de erro se os cabeçalhos não foram enviados ainda
      if (!res.headersSent) {
        return res
          .status(500)
          .json({ message: "Erro ao processar malote", error: err.message });
      }
    }
  }

  async atualizarMalote(req, res) {
    const Malote = req.body;
    const MaloteId = req.params.id;
    await MaloteDAO.atualizarMalote(Malote, MaloteId);
    console.log("atualizado");

    //ir para qual tela depois de atualizar?
  }

  async deletarMalote(req, res) {
    const idMalote = req.params.id;
    const Malote = await MaloteDAO.findById(idMalote);
    if (!Malote) {
      console.log(`Malote with ID: ${idMalote} not found.`);
      return res.status(404).json({ error: "Malote not found" });
    }

    console.log(`Malote found: ${JSON.stringify(Malote)}`);

    const isMaloteDeletado = await MaloteDAO.delete(idMalote);
    if (isMaloteDeletado.affectedRows > 0) {
      console.log(`Malote with ID: ${idMalote} was successfully deleted.`);

      await MaloteDAO.registrarMaloteDeletado(Malote);
      console.log("Malote deletado registered in tbl_Malote_deletado.");
      return res.json({
        message: "Malote deleted and registered successfully",
      });
    } else {
      console.log(`Malote with ID: ${idMalote} not found.`);
      return res.status(404).json({ error: "Malote not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting Malote: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the Malote" });
  }
}

//padrão singleton
export default new MaloteController();
