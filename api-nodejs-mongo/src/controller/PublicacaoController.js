import Publicacao from '../models/Publicacao.js';

class PublicacaoController{
  static listarPublicacoes = (req, res) => {
    // #swagger.summary = 'Lista publicações'
    const {titulo, categoria, dataCriacao} = req.query;
    const filtro = {};

    if(titulo){
      filtro.titulo = titulo;
    }

    if(categoria){
      filtro.categoria = categoria;
    }

    if(dataCriacao){
      filtro.dataCriacao = dataCriacao;
    }

    publicacoes.find(filtro)

    .then((publicacoes) => {
      response.status(200).json(publicacoes);
    })
    .catch((error) => {
      response.send('Erro ao consultar');
    })
  }

  static listarPublicacoesPorId = (req, res) => {
    // #swagger.summary = 'Lista publicações por ID'
    const id = req.params.id;

    publicacoes.findById(id)
      .then((publicacao) => {
        response.status(200).send(publicacao);
      })
      .catch((error) => {
        response.status(400).send({message: `${error.message} - Id da publicação não encontrado.`})
      })
  }

  static cadastrarPublicacao = async (req, res) =>{
    // #swagger.summary = 'Cadastra publicação'
    let publicacao = new publicacoes(req.body);
     
    const idUsuario = request.id;
    publicacao.usuario = idUsuario;

    await publicacao.save()
    
    .then((publicacao) => {
      res.status(201).send(publicacao.toJSON());
    })
    .catch((error) => {
      res.status(500).send({message: `${error.message} - falha ao cadastrar publicação.`})
    })
  }

  static atualizarPublicacao = async (req, res) => {
    // #swagger.summary = 'Atualiza publicação'
    const id = req.params.id;

    const publicacao = await publicacoes.findById(id);
    const usuarioId = publicacao.usuario.toString();

    if (!publicacao) {
      return res.status(404).json({ msg: "Publicação não encontrada" });
    }

    if (usuarioIdId !== req.id) {
      return res.status(403).json({ msg: "Não é possível atualizar publicações de outros usuários" });
    }


    publicacoes.findByIdAndUpdate(id, {$set: req.body})
    .then((result) => {
      res.status(200).send({message: 'Publicacao atualizada com sucesso'})
    })
    .catch((error) => {
      res.status(500).send({message: error.message});
    })
  }

  static removerPublicacao = async (req, res) => {
    // #swagger.summary = 'Remove publicação'
    const id = req.params.id;
    

    const publicacao = await publicacoes.findById(id);
    const usuarioId = publicacao.usuario.toString();
    //console.log(usuarioId)


    if (!publicacao) {
      return res.status(404).json({ msg: "Publicação não encontrada" });
    }

    if (usuarioId !== req.id) {
      return res.status(403).json({ msg: "Não é possível remover publicações de outros autores" });
    }
    
    publicacoes.findByIdAndDelete(id)
    .then((result) =>{
      res.status(200).send({message: 'Publicação removida com sucesso'});
    })
    .catch((error) => {
      res.status(400).send({message: error.message});
    })
     

  }
  
}

export default PublicacaoController;