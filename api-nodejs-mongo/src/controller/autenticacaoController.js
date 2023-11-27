import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuarios from "../models/Usuario.js";
import authenticate from "../middlewares/authenticate.js";


class AutenticacaoController {
  
  static login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "Obrigatório email!" });
    }

    if (!senha) {
      return res.status(422).json({ msg: "Obrigatório senha!" });
    }

    const usuario = await usuarios.findOne({ email: email });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const checkSenha = await bcrypt.compare(senha, usuario.senha);

    if (!checkSenha) {
      return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
      const meuSegredo = "hirsvbihbv";
      const token = jwt.sign(
        {
          id: usuario._id,
        },
        meuSegredo
      );

      return res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso", token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Falha na autenticação" });
    }
  };
 
}

export default AutenticacaoController;