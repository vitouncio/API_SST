import { Router } from "express";
import AlunoController from "./app/controllers/AlunoController.js";
import UsuarioController from "./app/controllers/UsuarioController.js";
import FornecedorController from "./app/controllers/FornecedorController.js";
import LoginController from "./app/controllers/LoginController.js";

const router = Router()

//CRUD ALUNOS
//Read
router.get("/buscarAlunos", AlunoController.index)
router.get("/buscarAluno/:id", AlunoController.show)
//Criar
router.post("/cadastrarAluno", AlunoController.store)
//Atualizar
router.put("/atualizarAluno/:id", AlunoController.update)
//Deletar
router.delete("/deletarAluno/:id", AlunoController.delete)

//LOGIN

router.get("/login", LoginController.index)
router.get("/telaCadastro", LoginController.cad)
router.get("/telaConfirmacaoEmail", LoginController.showTelaConfirmacao)

router.post("/enviarToken", LoginController.enviarEmailComToken)
router.post("/confirmarEmail", LoginController.confirmarEmail)
router.post("/perfilUsuario", LoginController.show)
router.post("/cadastrarUsuario", LoginController.store)
router.put("/atualizarPerfil/:id", LoginController.update)

//CRUD USUÁRIO
router.get("/buscarUsuarios", UsuarioController.index)
router.get("/buscarUsuario/:id", UsuarioController.show)
//Criar
router.post("/cadastrarUsuario", UsuarioController.store)
//Atualizar
router.put("/atualizarUsuario/:id", UsuarioController.update)
//Deletar
router.delete("/deletarUsuario/:id", UsuarioController.delete)

//CRUD FORNECEDOR
router.get("/buscarFornecedores", FornecedorController.index)
router.get("/buscarFornecedor/:id", FornecedorController.show)
//Criar
router.post("/cadastrarFornecedor", FornecedorController.store)
//Atualizar
router.put("/atualizarFornecedor/:id", FornecedorController.update)
//Deletar
router.delete("/deletarFornecedor/:id", FornecedorController.delete)

export default router