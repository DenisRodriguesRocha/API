import usuarios from "../models/Usuario.js";
import bcrypt from "bcrypt";

class UsuariosController {
  static listarUsuarios = (request, response) => {
    usuarios
      .find({}, {senha: 0})
      .then((usuarios) => {
        response.status(200).json(usuarios);
      })
      .catch((error) => {
        response.send("Erro ao consultar");
      });
  };

  static listarUsuarioPorId = async (request, response) => {
    const id = request.params.id;

    await usuarios.findById(id, "-senha")
      
      .then((usuario) => {
        response.status(200).send(usuario);
      })
      .catch((error) => {
        response
          .status(400)
          .send({ message: `${error.message} - Id do usuário não localizado.` });
      });
  };

  static cadastrarUsuario = async (request, response) => {
    const { nome, email, senha, biografia } = request.body;

    if (!nome) {
      return response.status(422).json({ msg: "Obrigatório nome!" });
    }

    if (!email) {
      return response.status(422).json({ msg: "Obrigatório email!" });
    }

    if (!senha) {
      return response.status(422).json({ msg: "Obrigatório senha!" });
    }

    const usuarioExiste = await usuarios.findOne({ email: email });

    if (usuarioExiste) {
      return response.status(422).json({ msg: "Email já está sendo utilizado!" });
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const usuario = new usuarios({
      nome,
      email,
      senha: senhaHash,
      biografia,
    });

    try {
      await usuario.save();
      response.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      response.status(500).json({ msg: "Falha na criação do Usuário"`${error}` });
    }
  };

  static atualizarUsuario = async (request, response) => {
    const {nome, biografia} = request.body;

    const id = request.params.id;
    const usuarioId = request.id;

    const usuario = await usuarios.findById(id);

    if (!usuario) {
      return response.status(404).json({ msg: "Usuário não encontrado" });
    }

    if (usuario.id !== usuarioId) {
      return response.status(403).json({ msg: "Não é possível atualizar outros usuarios" });
    }

    
    await usuarios
      .findByIdAndUpdate(id, { $set: {nome: nome, biografia: biografia }})

      .then((result) => {
        return response
          .status(200)
          .json({ message: "Usuário atualizado com sucesso" });
      })
      .catch((error) => {
        return response.status(500).json({ message: "Falha ao atualizar" });
      });

  };

  static removerUsuario = async (request, response) => {
    const id = request.params.id;
    const usuarioId = request.id;

    const usuario = await usuarios.findById(id);

    if (!usuario) {
      return response.status(404).json({ msg: "Usuário não encontrado" });
    }

    if (usuario.id !== usuarioId) {
      return response
        .status(403)
        .json({ msg: "Não é possível remover outros usuários" });
    }

    usuarios
      .findByIdAndDelete(id)
      .then((result) => {
        response.status(200).send({ message: "usuário removido com sucesso" });
      })
      .catch((error) => {
        response.status(400).send({ message: error.message });
      });
  };
}

export default UsuariosController;