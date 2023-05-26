const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const {createTokens, validateToken}  = require("../JWT")



module.exports = {
    async MostrarTodosProfessor(req, res){
            const professores = await prisma.professor.findMany()
            res.json(professores);
    },


    async createProfessor(req, res){
        try {
            const { nome, email, senha } = req.body;
            let professor = await prisma.professor.findUnique({
                where : { email}
            })
            if(professor) {
                return res.json({err: "Esse email já está em uso"})
            } 
            await bcrypt.hash(senha, 10).then((hash) => {
                prisma.professor.create({
                    data : {
                        nome,
                        email,
                        senha: hash 
                    }
                    }).then(() => {
                        res.json("Usuário criado");
                    }).catch((err) => {
                        res.json({err: "Algo deu errado"})
                    })
            })       
           
        }catch(err){
            res.json({error : err});
        }
    },


    async buscarProfessor(req, res){
        const { id } = req.params;
    
        try {
            const professor = await prisma.professor.findUnique({where: {id: parseInt(id, 10)}
            })
            res.json(professor)
        } catch(err){
            res.json({error: err});
        }
    },

    async updateProfessor(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            let professor = await prisma.professor.findUnique({
                where: { id: parseInt(id) },
            });

            if(!professor) {
                return res.json({ error: "Professor não existe" });
            }

            professor = await prisma.professor.update({
                where: { id: parseInt(id) },
                data: { nome, email },
                select: {
                    nome: true,
                    email: true
                }
            });
            return res.json(professor)
        } catch (error) {
            res.json({ error });
        }
    },
    
    async deleteProfessor(req, res) {
        try {
            const { id } = req.params;
      
            const professor = await prisma.aluno.findUnique({
              where: { id: parseInt(id) },
            });
      
            if (!professor) {
                return res.json({ error: "Professor não existe" });
            }

            await prisma.professor.delete({ where: { id: parseInt(id) } });
            return res.json("Professor deletado" );
          } catch (error) {
            return res.json({ error });
          }
    },

    async mostrarAlunos(req, res) {
        const { id } = req.params
        let professor = await prisma.professor.findUnique({
            where: { id: parseInt(id) },
        });

        if(!professor) {
            return res.json({ error: "Professor não existe" });
        }

        try {
            let alunos = await prisma.aluno.findMany({
                where: { professorId: parseInt(id)},
                select: {
                    id: true,
                    nome: true,
                    curso: true
                }
            });
            return res.json(alunos);
        } catch (error) {
            return res.json({ error });
        }
    }
}