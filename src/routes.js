import { Router } from "express";
import UsuarioController from "./app/controllers/UsuarioController.js";
import FuncionarioController from "./app/controllers/FuncionarioController.js";
import LoginController from "./app/controllers/LoginController.js";
import ClienteController from "./app/controllers/ClienteController.js";
import MaloteController from "./app/controllers/MaloteController.js";
import ContaController from "./app/controllers/ContaController.js";
import DepositoController from "./app/controllers/DepositoController.js";
import EntradaController from "./app/controllers/EntradaController.js"
import ContaCaixaController from "./app/controllers/ContaCaixaController.js";
import SaidaController from "./app/controllers/SaidaController.js";
import TransacaoController from "./app/controllers/TransacaoController.js";
import SaqueController from "./app/controllers/SaqueController.js";
import ExtratoController from "./app/controllers/ExtratoController.js";
const router = Router();

//LOGIN

router.get("/login", LoginController.index);
router.get("/homeUsuario", LoginController.home);
router.get("/logout", LoginController.logout);
router.post("/logarUsuario", LoginController.login);

//USUARIO
router.get("/telaCadUsuario", UsuarioController.telaCadastroUsuario);
router.get("/telaBuscarUsuarios", UsuarioController.telaBuscarUsuarios);
router.get("/telaEditarUsuario/:id", UsuarioController.telaEditarUsuario);
router.put("/atualizarUsuario/:id", UsuarioController.atualizarUsuario);
router.post("/cadastrarUsuario", UsuarioController.cadastrarUsuario);
router.delete("/deletarUsuario/:id", UsuarioController.deletarUsuario);

//CLIENTE

router.get("/telaCadCliente", ClienteController.telaCadastroCliente);
router.get("/perfilCliente/:id", ClienteController.telaPerfilCliente);
router.get("/telaBuscarClientes", ClienteController.telaBuscarClientes);
router.get("/buscarClientes", ClienteController.buscarClientes);
router.get("/buscarClientesComContaCaixa", ClienteController.buscarClientesComContaCaixa);
router.get("/buscarDetalhesCliente/:id", ClienteController.buscarClientesComContaCaixa);
router.get("/telaEditarCliente/:id", ClienteController.telaEditarCliente);
router.post("/cadastrarCliente", ClienteController.cadastrarCliente);
router.put("/atualizarCliente/:id/:idEnd", ClienteController.atualizarCliente);
router.delete("/deletarCliente/:id", ClienteController.deletarCliente);

//CRUD FUNCIONARIO
router.get("/perfilFuncionario/:id", FuncionarioController.perfilFuncionario);
router.get(
  "/telaCadFuncionario/:id",
  FuncionarioController.telaCadastroFuncionario
);
router.post(
  "/cadastrarFuncionario/:id",
  FuncionarioController.cadastrarFuncionario
);
router.get("/telaEditarFuncionario/:id", FuncionarioController.telaEditarFuncionario);
router.put("/atualizarFuncionario/:id", FuncionarioController.atualizarFuncionario);

router.delete("/deletarFuncionario/:id", FuncionarioController.deletarFuncionario);


//------------------ SERVIÇOS -----------------------

//MALOTE
router.get("/telaCadMalote/:id", MaloteController.telaCadastroMalote)
router.post(
    "/cadastrarMalote/:id",
    MaloteController.cadastrarMalote
  );
  router.get("/telaProcMalote/:id", MaloteController.telaProcMalote)
  router.get('/malotesPendentes', MaloteController.getMalotesPendentes);
  router.get('/malotesProcessados', MaloteController.getMalotesProcessados);
  router.get('/malotesDevolvidos', MaloteController.getMalotesDevolvidos);
  router.post("/processarMalote/:id", ContaController.cadastrarContas, MaloteController.processarMalote )
  
//DEPOSITOS
router.get("/telaDeposito", DepositoController.telaDeposito)
router.get("/telaDeposito/:id_deposito", DepositoController.telaDeposito)
router.get("/telaCadDeposito", DepositoController.telaCadastroDeposito)
router.get("/buscarHistoricoDeDepositos", DepositoController.buscarHistoricoDeDepositos)
router.post("/confirmacaoDeposito", DepositoController.telaConfirmarDeposito); 
//CONSULTAS DEPOSITOS
router.get("/buscarOrigemDeposito/:id", DepositoController.buscarDeposito)

//ENTRADAS
//CONSULTAS ENTRADAS
router.get("/buscarOrigemEntrada/:id", EntradaController.buscarEntrada)

//TRANSACOES
router.post("/confirmarTransacaoDeposito",EntradaController.registrarEntrada, DepositoController.cadastrarDeposito, SaidaController.registrarSaidaDeposito, SaidaController.registrarSaidaTroco, TransacaoController.registrarTransacao);
//CONSULTAS TRANSACOES
router.get("/buscarOrigemTransacaoDeposito/:id", TransacaoController.buscarTransacao)
router.get("/buscarOrigemTransacaoTroco/:id", TransacaoController.buscarTransacao)

//CONTAS
router.get("/telaRecebimentoDeConta", ContaController.telaRecebimentoDeConta)
router.post("/cadastrarContas", ContaController.cadastrarContas)
//SAQUE
router.get("/telaSaque", SaqueController.telaSaque)
router.get("/telaCadSaque", SaqueController.telaCadSaque)
router.get("/buscarHistoricoDeSaques", SaqueController.buscarHistoricoDeSaques)
router.post("/telaConfirmacaoDeSaque", SaqueController.telaConfirmacaoDeSaque)
router.post("/confirmarSaque", SaqueController.registrarSaque)


//EXTRATO
router.get("/telaExtrato", ExtratoController.telaExtrato)
router.get("/buscarHistoricoExtratos", ExtratoController.buscarHistoricoExtratos);

export default router;