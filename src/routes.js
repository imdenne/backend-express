const { Router } = require("express");
const ProfessorController = require("./Controllers/ProfessorController");
const AlunoController = require("./Controllers/AlunoController")
const router = Router();




//Professor
router.post("/criarProfessor", ProfessorController.createProfessor);
router.get("/professor/:id", ProfessorController.buscarProfessor);
router.put("/professor/:id", ProfessorController.updateProfessor);
router.delete("/professor/:id", ProfessorController.deleteProfessor);
router.get("/professor/:id/listaDeAlunos", ProfessorController.mostrarAlunos);
router.get("/professores", ProfessorController.MostrarTodosProfessor);


//Aluno
router.post("/:professorId/criarAluno",  AlunoController.createAluno);
router.get("/:professorId/alunos", AlunoController.buscarAluno);
router.get("/buscarTodosAlunos", AlunoController.buscarTodosAlunos)
router.put("/:professorId/alunos/:alunoId", AlunoController.updateAluno);
router.delete("/:professorId/alunos/:alunoId", AlunoController.deleteAluno)

module.exports = { router }