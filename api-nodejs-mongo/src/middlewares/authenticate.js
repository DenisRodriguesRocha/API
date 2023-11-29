import jwt from "jsonwebtoken";

const authenticate = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader;

  if(!authHeader){
    return response.status(401).json({msg: "token não enviado"})
  }

  if (!token) {
    return response.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const meuSegredo = "hirsvbihbv";
    const decode = jwt.verify(token, meuSegredo);
    request.id = decode.id;
    
    next();
  } catch (error) {
    
    response.status(400).json({ msg: "Token inválido!" });
  }
}

export default authenticate;