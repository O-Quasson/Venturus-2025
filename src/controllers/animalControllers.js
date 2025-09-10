import {Animal, PedidoAdocao} from "../models/Modelos.js";

//QUASE certeza que tá pronto essas rotas já
//pergunta pro Alex depois
//are you sure?
//pretty sure
//are you sure?
//threw a trashbag
//are you sure?
//into space
//are you sure?
//at work
//are you sure?

const postAnimal = async (req, res) => {
  try {

    const provavelAnimal = ({
      nome: req.body.nome,
      especie: req.body.especie,
      porte: req.body.porte,
      castrado: req.body.castrado || false,
      vacinado: req.body.vacinado || false,
      descricao: req.body.descricao || '',
      foto: req.body.foto || null
    });
    
    if((!provavelAnimal.nome)||(!provavelAnimal.especie)||(!provavelAnimal.porte)||(!provavelAnimal.descricao)){
      res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
    }else{
      const novoAnimal = await Animal.create({
        nome: provavelAnimal.nome,
        especie: provavelAnimal.especie,
        porte: provavelAnimal.porte,
        castrado: provavelAnimal.castrado || false,
        vacinado: provavelAnimal.vacinado || false,
        descricao: provavelAnimal.descricao,
        foto: provavelAnimal.foto || null
      });

      res.status(201).json({
        id: novoAnimal.id,
        nome: novoAnimal.nome,
        especie: novoAnimal.especie,
        porte: novoAnimal.porte,
        castrado: novoAnimal.castrado,
        vacinado: novoAnimal.vacinado,
        descricao: novoAnimal.descricao,
        foto: novoAnimal.foto,
      });

    }

  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
  }
};


const getAnimais = async (req, res) => {
  try{
    const parametros = { 
      especie: req.body.especie, 
      porte: req.body.porte, 
      castrado: req.body.castrado, 
      vacinado: req.body.vacinado 
    };

    let filtros = {};
    
    if(parametros.especie){
      filtros.especie = parametros.especie;
    };

    if(parametros.porte){
      filtros.porte = parametros.porte;
    };

    if(parametros.castrado !== undefined) {
      filtros.castrado = parametros.castrado === "true"; 
    };
    
    if(parametros.vacinado !== undefined){
      filtros.vacinado = parametros.vacinado === "true";
    };

    const animais = await Animal.findAll({
      where: filtros,
      order: [["createdAt", "ASC"]]
    });

    res.json({
      "data": animais,
      "total": animais.length
    });

  }catch(error){
    res.status(500).json({ "erro": "Erro ao buscar animais" });
  }
};

//rota de admin a partir daqui

const getAnimaisAdmin = async (req, res) => {
  try{
    const parametros = { 
      id: req.body.id,
      nome: req.body.nome,
      especie: req.body.especie, 
      porte: req.body.porte, 
      castrado: req.body.castrado, 
      vacinado: req.body.vacinado,
      adotado: req.body.adotado,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    let filtros = {};

    if(parametros.id){
      filtros.id = parametros.id;
    };

    if(parametros.nome){
      filtros.nome = parametros.nome;
    };
    
    if(parametros.especie){
      filtros.especie = parametros.especie;
    };

    if(parametros.porte){
      filtros.porte = parametros.porte;
    };

    if(parametros.castrado !== undefined) {
      filtros.castrado = parametros.castrado === "true"; 
    };
    
    if(parametros.vacinado !== undefined){
      filtros.vacinado = parametros.vacinado === "true";
    };

    if(parametros.adotado !== undefined){
      filtros.adotado = parametros.adotado === "true";
    };

    if(parametros.createdAt){
      filtros.createdAt = parametros.createdAt;
    };

    if(parametros.updatedAt){
      filtros.updatedAt = parametros.updatedAt;
    };

    const animais = await Animal.findAll({
      where: filtros,
      order: [["createdAt", "ASC"]]
    });

    res.json({
      "data": animais,
      "total": animais.length
    });

  }catch(error){
    res.status(500).json({ "erro": "Erro ao buscar animais" });
  }
};

const getAnimalById = async (req, res) => {
  try{
    const animalBuscado = await Animal.findByPk(req.params.id, { include: PedidoAdocao });

    if(!animalBuscado){
      res.status(404).json({"erro": "Animal não encontrado"});
    }else{
      res.status(200).json(animalBuscado);
    }

  }catch(error){
    res.status(500).json({"erro": "Erro ao procurar o animal"});
  }
};

const patchAnimal = async (req, res) => {
  try{
    const animalProcurado = await Animal.findByPk(req.params.id);

    if(!animalProcurado){
      res.status(404).json({"erro": "Animal não encontrado"});
    }else{
      const animalAtualizado = await animalProcurado.update({
        nome: req.body.nome,
        especie: req.body.especie,
        porte: req.body.porte,
        castrado: req.body.castrado,
        vacinado: req.body.vacinado,
        descricao: req.body.descricao,
        foto: req.body.foto
      })

      if(Object.keys(animalAtualizado)==""){
        res.status(400).json({"erro": "Nenhum campo foi fornecido para atualização"});
      }else{
        res.status(200).json(animalAtualizado);
      }

    }
  }catch(error){
    res.status(500).json({"erro": "Erro interno ao atualizar animal"});
  }
};

const delAnimal = async (req, res) => {
  try{  
    const animalProcurado = await Animal.findByPk(req.params.id);

    if(!animalProcurado){
      res.status(404).json({"erro": "Animal não encontrado"});
    }else{
      await animalProcurado.destroy();
      res.status(204).json();
    }

  }catch(error){
    res.status(500).json({"erro": "Erro ao remover animal"});
  }
};


export { postAnimal, getAnimais, getAnimaisAdmin, getAnimalById, patchAnimal, delAnimal }