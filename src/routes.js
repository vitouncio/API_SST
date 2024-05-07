import { Router } from "express";
import AlunoController from "./app/controllers/AlunoController.js";
import UsuarioController from "./app/controllers/UsuarioController.js";

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

//CRUD USUÁRIO
/*router.get("/buscarUsuarios", UsuarioController.index)
router.get("/buscarUsuario/:id", UsuarioController.show)
//Criar
router.post("/cadastrarUsuario", UsuarioController.store)
//Atualizar
router.put("/atualizarUsuario/:id", UsuarioController.update)
//Deletar
router.delete("/deletarUsuario/:id", UsuarioController.delete)*/

export default router