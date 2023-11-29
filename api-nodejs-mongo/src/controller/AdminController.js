import Admin from '../models/Admin.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

class AdminController {

  static async gerarAdmin() {
    // #swagger.summary = 'Cria Admin por padrão'
    try {
      const adminExistente = await Admin.findOne({ isAdmin: true });

      if (!adminExistente) {
        const nome = 'admin';
        const email = 'admin@gmail.com';
        const senha = 'admin123'; 

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoAdmin = new Admin({
          nome,
          email,
          senha: senhaHash,
          isAdmin: true,
        });

        await novoAdmin.save();
        console.log('Usuário administrador padrão criado com sucesso.');
      } else {
        console.log('Já existe um usuário administrador no sistema.');
      }
    } catch (error) {
      console.error(`Erro ao criar usuário administrador padrão: ${error}`);
    }
  };

  static cadastrarAdmin = async (request, response) => {
    // #swagger.summary = 'Cadastra admin'
    const { nome, email, senha, biografia } = request.body;

    /*
    const idAdmin = request.id;
    const { isAdmin } = await Admin.findById(idAdmin);
  
  
    if (!isAdmin) {
      return response.status(403).json({ msg: 'Apenas administradores podem criar novos administradores.' });
    }
  */
        if (!nome) {
      return response.status(422).json({ msg: "Obrigatório nome!" });
    }

    if (!email) {
      return response.status(422).json({ msg: "Obrigatório email!" });
    }

    if (!senha) {
      return response.status(422).json({ msg: "Obrigatório senha!" });
    }

    const adminExiste = await Admin.findOne({ email: email });

    if (adminExiste) {
      return response.status(422).json({ msg: "Email já está sendo utilizado!" });
    }
  
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
  
    const novoAdmin = new Admin({
      nome,
      email,
      senha: senhaHash,
      biografia,
      isAdmin: true, 
    });
  
    try {
      await novoAdmin.save();
      response.status(201).json({ msg: 'Novo administrador criado com sucesso!' });
    } catch (error) {
      response.status(500).json({ msg: `Falha na criação do administrador: ${error}` });
    }
  };

  static listarAdmin = (request, response) => {
    // #swagger.summary = 'Lista admins'
    Admin
      .find({}, {senha: 0})
      .then((Admin) => {
        response.status(200).json(Admin);
      })
      .catch((error) => {
        response.send("Erro ao consultar");
      });
  };

  static deletarUsuario = async (request, response) => {
    // #swagger.summary = 'Admin remove usuário'
    const id = request.params.id;
  
    /*
    const { isAdmin } = request.id; 
  
    if (!isAdmin) {
      return response.status(403).json({ msg: 'Apenas administradores podem excluir usuários.' });
    }
  */
    const usuario = await Usuario.findById(id);
    const admin = await Admin.findById(id);

    if (!usuario && !admin) {
      return response.status(404).json({ msg: 'Usuário não encontrado.' });
    }
  
    if (admin) {
      return response.status(403).json({ msg: 'Não é possível excluir um administrador.' });
    }
  
    Usuario.findByIdAndDelete(id)
      .then(() => {
        response.status(200).json({ msg: 'Usuário não administrador removido com sucesso.' });
      })
      .catch((error) => {
        response.status(500).json({ msg: `Falha ao excluir usuário: ${error}` });
      });
  };


}

export default AdminController;
