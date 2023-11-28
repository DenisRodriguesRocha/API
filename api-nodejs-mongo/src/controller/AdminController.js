import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

class AdminController {

  static async criarAdminPadrao() {
    try {
      const adminExistente = await Admin.findOne({ isAdmin: true });

      if (!adminExistente) {
        const nome = 'Admin';
        const email = 'admin@example.com';
        const senha = 'senhaAdmin'; 

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

  static criarAdmin = async (request, response) => {
    const { nome, email, senha, biografia } = request.body;
  
    const { isAdmin } = request.user; 
  
    if (!isAdmin) {
      return response.status(403).json({ msg: 'Apenas administradores podem criar novos administradores.' });
    }
  
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

  static excluirNaoAdmin = async (request, response) => {
    const id = request.params.id;
  
    
    const { isAdmin } = request.user; 
  
    if (!isAdmin) {
      return response.status(403).json({ msg: 'Apenas administradores podem excluir usuários.' });
    }
  
    const usuario = await Admin.findById(id);
  
    if (!usuario) {
      return response.status(404).json({ msg: 'Usuário não encontrado.' });
    }
  
    if (usuario.isAdmin) {
      return response.status(403).json({ msg: 'Não é possível excluir um administrador.' });
    }
  
    Admin.findByIdAndDelete(id)
      .then(() => {
        response.status(200).json({ msg: 'Usuário não administrador removido com sucesso.' });
      })
      .catch((error) => {
        response.status(500).json({ msg: `Falha ao excluir usuário: ${error}` });
      });
  };


}

export default AdminController;
