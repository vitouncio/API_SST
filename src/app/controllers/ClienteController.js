import ClienteDAO from "../model/ClienteDAO.js";
import MaloteDAO from "../model/MaloteDAO.js";
import { format } from "date-fns";

class ClienteController {
  telaCadastroCliente(req, res) {
    try {
      res.render("cliente/cadastroCliente");
    } catch (err) {
      console.log(err);
    }
  }

  async telaPerfilCliente(req, res) {
    try {
      console.log(req.params.id)
      const cliente = await ClienteDAO.findById(req.params.id);

      if (cliente.tipo_cliente === "PJ") {
        const malotes = await MaloteDAO.findAllMalotesByIdCliente(
          req.params.id
        );
        const funcionarios = await ClienteDAO.findFuncionariosOfCliente(
          req.params.id
        );

        return res.render("cliente/perfilCliente", {
          cliente,
          malotes,
          funcionarios,
        });
      }

      res.render("cliente/perfilCliente", {
        cliente,
        malotes: [],
        funcionarios: [],
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao carregar o perfil do cliente");
    }
  }

  async telaBuscarClientes(req, res) {
    try {
      const clientes = await ClienteDAO.findAll();
      res.render("cliente/telaBuscarClientes", { clientes });
    } catch (err) {
      console.log(err);
    }
  }

  async telaEditarCliente(req, res) {
    const idCliente = req.params.id;
    try {
      const cliente = await ClienteDAO.findByIdWithEndereco(idCliente);
      res.render("cliente/telaEditarCliente", { cliente });
    } catch (err) {
      console.log(err);
    }
  }

  async atualizarCliente(req, res) {
    const cliente = req.body;
    const idCliente = req.params.id;
    const id_endereco = req.params.idEnd;
    try {
      const { cep, logradouro, complemento, bairro, cidade, uf } = cliente;
      await ClienteDAO.atualizarEndereco(
        {
          cep,
          logradouro,
          complemento,
          bairro,
          cidade,
          uf,
        },
        id_endereco
      );

      if (cliente.tipo_cliente == "PF") {
        const {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
        } = cliente;

        await ClienteDAO.atualizarCliente(
          {
            tipo_cliente,
            cpf_cnpj,
            nome_cliente,
            email_cliente,
            telefone_cliente,
          },
          idCliente
        );
      } else if (cliente.tipo_cliente == "PJ") {
        const {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
          razao_social,
        } = cliente;

        await ClienteDAO.atualizarCliente(
          {
            tipo_cliente,
            cpf_cnpj,
            nome_cliente,
            email_cliente,
            telefone_cliente,
            razao_social,
          },
          idCliente
        );
      }

      res.status(200).json({ message: 'Deu bom' });
    } catch (err) {
      console.error(err);
    }
  }

  async buscarClientesComContaCaixa(req, res) {
    try {
      const cliente = await ClienteDAO.findAllClientesComContaCaixa();
      res.json(cliente);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao buscar clientes com conta caixa");
    }
  }

  async buscarClientes(req,res){
    try{
      const listaClientes = await ClienteDAO.findAll()
      res.json(listaClientes) 
    }catch(err){
      console.log(err)
    }
  }

  async cadastrarCliente(req, res) {
    const cliente = req.body;
    try {
      const { cep, logradouro, complemento, bairro, cidade, uf } = cliente;
      const enderecoCad = await ClienteDAO.criarEndereco({
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        uf,
      });
      const id_endereco = enderecoCad.insertId;

      if (cliente.tipo_cliente == "PF") {
        const {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
        } = cliente;
        const pf = {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
          id_endereco,
        };
        await ClienteDAO.create(pf);
      } else if (cliente.tipo_cliente == "PJ") {
        const {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
          razao_social,
        } = cliente;
        const pj = {
          tipo_cliente,
          cpf_cnpj,
          nome_cliente,
          email_cliente,
          telefone_cliente,
          razao_social,
          id_endereco,
        };
        await ClienteDAO.create(pj);
      }

      res.redirect("/homeUsuario");
    } catch (err) {
      console.error(err);
    }
  }

  async index(req, res) {
    const result = await ClienteDAO.findAll();
    res.json(result);
  }

  async editarCliente(req, res) {
    const idAluno = req.params.id;
    const aluno = req.body;
    const result = await ClienteDAO.update(aluno, idAluno);
    res.json(result);
  }

  async deletarCliente(req, res) {
    const idCliente = req.params.id;
    console.log(idCliente);
    const cliente = await ClienteDAO.findById(idCliente);
    if (!cliente) {
      console.log(`Cliente with ID: ${idCliente} not found.`);
      return res.status(404).json({ error: "Cliente not found" });
    }

    console.log(`Cliente found: ${JSON.stringify(cliente)}`);

    const isClienteDeletado = await ClienteDAO.delete(idCliente);
    if (isClienteDeletado.affectedRows > 0) {
      console.log(`Cliente with ID: ${idCliente} was successfully deleted.`);
      const data = new Date();
      const dataFormatada = format(data, "dd/MM/yyyy HH:mm:ss");
      cliente.data_remocao = data;
      delete cliente.tipo_cliente;
      await ClienteDAO.registrarClienteDeletado(cliente);
      console.log("Cliente deletado registered in tbl_cliente_deletado.");
      return res.json({
        message: "Cliente deleted and registered successfully",
      });
      res.refresh();
    } else {
      console.log(`Cliente with ID: ${idCliente} not found.`);
      return res.status(404).json({ error: "Cliente not found" });
    }
  }
  catch(error) {
    console.error(`Error while deleting cliente: ${error.message}`);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the cliente" });
  }
}

//padrão singleton
export default new ClienteController();
