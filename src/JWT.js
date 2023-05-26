const { sign, verify } = require("jsonwebtoken");

//Criar o TOKEN
const createTokens = (professor) => {
  const {email, id} =  professor;
  const accessToken = sign({
    email, 
    id
  },
  "jwtsecret",
  { expiresIn: "1h"}
  );
  return accessToken;
}

const validadeToken = (req, res, next) => {
  const acessToken = req.cookies("access-token");
  if(!acessToken) {
    res.status(404).json({error: "Nao autenticado"})
  }
  
  try {
    const validToken = verify(acessToken, "jwtsecret");
    if(validToken) {
      req.authenticated = true;
      return next();
    }
  } catch(err){
    res.status(404).json({error: "Algo deu errado"})
  }
}


module.exports = {createTokens, validadeToken}