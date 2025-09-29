import jwt from 'jsonwebtoken';

const secreta = "teambluududjointoday!!!";
//amo o fato que eu declaro a chave toda santa vez que eu preciso usar ela ao invés de só importar ela de um arquivo

//esse next aqui é só pra middleware
//basicamente diz: terminou oq tu tá fazendo, passa pro próximo
//https://medium.com/@utkarsh.gupta0311/secure-user-authentication-with-jwt-bcrypt-and-node-js-78c7bb2d86a1 -> link de exemplo que o Tomas mandou
const autenticar = (req, res, next) => {

  //não sei como isso funciona não, na real
  //o exemplo do site que eu peguei tava assim, eu só segui
  //se eles perguntarem sobre isso, tamo é tomado no cu lol
  //we are so cooked 💔🥀

  const header = req.headers.authorization;

  //ele divide a string em um array de 2 posições e pega a string da 2ª posição, pq pra passar o token ele faz "Bearer <token>"
  //https://www.w3schools.com/nodejs/nodejs_api_auth.asp
  const token = header.split(" ")[1];

  const tokenVerificado = jwt.verify(token, secreta);

  //peak desenvolvimento
  if(tokenVerificado.administrador==false) {
    res.status(403).json({ "erro": "Acesso não autorizado" });
  }else{
    next();
  };
};


export default autenticar;
