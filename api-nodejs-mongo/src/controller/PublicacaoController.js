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

    Publicacao.find(filtro)

    .then((Publicacao) => {
      res.status(200).json(Publicacao);
    })
    .catch((error) => {
      res.send('Erro ao consultar');
    })
  }

  static listarPublicacoesPorId = (req, res) => {
    // #swagger.summary = 'Lista publicações por ID'
    const id = req.params.id;

    Publicacao.findById(id)
      .then((Publicacao) => {
        res.status(200).send(Publicacao);
      })
      .catch((error) => {
        res.status(400).send({message: `${error.message} - Id da publicação não encontrado.`})
      })
  }

  static cadastrarPublicacao = async (request, res) => {
    // #swagger.summary = 'Cadastra publicação'
    const { titulo, conteudo, autor } = request.body;
  

    if (!titulo) {
      return res.status(422).json({ msg: "Obrigatório título!" });
    }
  
    if (!conteudo) {
      return res.status(422).json({ msg: "Obrigatório conteúdo!" });
    }
  
    if (!autor) {
      return res.status(422).json({ msg: "Obrigatório autor!" });
    }
  
    const publicacao = new Publicacao({
      titulo,
      conteudo,
      autor
    });
  
    try {
      const novaPublicacao = await publicacao.save();
      res.status(201).send(novaPublicacao.toJSON());
    } catch (error) {
      res.status(500).send({ message: `${error.message} - falha ao cadastrar publicação.` });
    }
  }
  

  static atualizarPublicacao = async (req, res) => {
    // #swagger.summary = 'Atualiza publicação'
    const id = req.params.id;

    const publicacao = await Publicacao.findById(id);
    const autorId = publicacao.autor.toString();

    if (!publicacao) {
      return res.status(404).json({ msg: "Publicação não encontrada" });
    }

    if (autorId !== req.id) {
      return res.status(403).json({ msg: "Não é possível atualizar publicações de outros usuários" });
    }


    Publicacao.findByIdAndUpdate(id, {$set: req.body})
    .then(() => {
      res.status(200).send({message: 'Publicacao atualizada com sucesso'})
    })
    .catch((error) => {
      res.status(500).send({message: error.message});
    })
  }

  static removerPublicacao = async (req, res) => {
    // #swagger.summary = 'Remove publicação'
    const id = req.params.id;
    

    const publicacao = await Publicacao.findById(id);
    const usuarioId = publicacao.autor.toString();
    //console.log(usuarioId)


    if (!publicacao) {
      return res.status(404).json({ msg: "Publicação não encontrada" });
    }

    if (usuarioId !== req.id) {
      return res.status(403).json({ msg: "Não é possível remover publicações de outros autores" });
    }
    
    Publicacao.findByIdAndDelete(id)
    .then(() =>{
      res.status(200).send({message: 'Publicação removida com sucesso'});
    })
    .catch((error) => {
      res.status(400).send({message: error.message});
    })
     

  }
  
}

export default PublicacaoController;