const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports = {
  async createAluno(req, res) {
    const { nome, curso, professorId } = req.body;
  
    const alunoExistente = await prisma.aluno.findFirst({
      where: {
        nome: nome,
        curso: curso
      }
    });
  
    if (alunoExistente) {
      return res.json("Esse aluno já foi criado");
    }
  
    try {
      const professor = await prisma.professor.findUnique({
        where: {
          id: professorId
        }
      });
  
      if (!professor) {
        return res.status(400).json({ error: "Professor não encontrado" });
      }
  
      const aluno = await prisma.aluno.create({
        data: {
          nome,
          curso,
          professor: {
            connect: {
              id: professorId
            }
          }
        }
      });
  
      res.json(aluno);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar novo aluno.' });
    }
  },  


  async buscarAluno(req, res){
    const { professorId } = req.params;
  
    try{
      const alunos = await prisma.aluno.findMany({
        where: {
          professorId: parseInt(professorId)}
      });
      res.json(alunos);
  
    }catch(err){
      res.status(500).json({error: "Erro de busca de alunos"});
  
    }
  },

  async buscarTodosAlunos(req,res) {
    try {
      const alunos = await prisma.aluno.findMany();
      return res.json(alunos);
    } catch (error) {
      return res.json({ error });
    }
  },
  
  async updateAluno(req, res){
    const {alunoId} = req.params;
    const {nome, curso} =  req.body;
  
    try{
      const alunoAtualizado = await prisma.aluno.update({
        where: {id: parseInt(alunoId, 10)},
        data: {nome, curso},
        
      });
        
        res.json(alunoAtualizado);
  
    } catch(err){
      res.json({error: err})
    }
  },
  
  async deleteAluno(req, res){
    const {alunoId} = req.params;
  
    try{
      const deletedAluno = await prisma.aluno.delete({
        where: {
          id:  parseInt(alunoId, 10)
        }
      })
      res.json({message: "Aluno Deletado", deletedAluno})
    }catch(err){
      res.status(400).json({err: "Algo deu errado"});
    }
  }
};
