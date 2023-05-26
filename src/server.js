const express = require("express");
const { router } = require("./routes");
const {PrismaClient} = require("@prisma/client");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {createTokens, validadeToken}  = require("./JWT")
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(cookieParser()); 

app.use(express.json());
app.use(router);

const prisma = new PrismaClient();

app.post("/loginProfessor", async (req, res) => {
    try{
    const {email, senha} = req.body;
    const usuario = await prisma.professor.findUnique({where: {email}});
    if(!usuario) {
      res.status(404).json({error: "Usuario nao existe"})
    }
    const pSenha = usuario.senha;
    bcrypt.compare(senha, pSenha).then((match) => {
      if(!match) {
        res.status(404).json({error: "Senha ou Email errados"})
      }  else {
        
        const acessToken = createTokens(usuario)
        res.cookie("acess-token", acessToken, {
          httpOnly: false
        
    });
        res.json({
          message: "Você está logado",
          id: usuario.id, 
          acessToken: acessToken
        })
      }
    })
  
   
    } catch(error){
      console.error(error)
    }
    
  })
  
  
  app.get("/", validadeToken ,async (req, res) => {
      
      return res.json("usuario");
  })
  
  


app.listen(8080, () => {
    console.log("Server running on port 8080...")
}); 