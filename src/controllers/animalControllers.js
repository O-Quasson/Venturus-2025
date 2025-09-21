import {Animal, PedidoAdocao} from "../models/Modelos.js";
import { Op } from 'sequelize';
//esse op é um coiso do sequelize que permite a manipulação de datastamps (data, tempo, etc, sei lá como vocês chamam isso)

const postAnimal = async (req, res) => {
  try {

    const provavelAnimal = ({
      nome: req.body.nome,
      especie: req.body.especie,
      porte: req.body.porte,
      //cara, pq caralhos os campos castrado e vacinado não podem ser vazios? Tipo, e se o cachorro for da rua e eu não souber? Banco de dados todo errado
      castrado: req.body.castrado,
      vacinado: req.body.vacinado,
      descricao: req.body.descricao,
      //uhhhh eu ACHO que não é assim que se requisita uma imagem
      //isso sequer funciona?
      foto: req.body.foto || ''
    });
    
    //TEM A PORRA DE UM CAMPO PRA 'ADOTADO' (n coloquei no if ainda)
    //PRA QUE CARALHOS TU VAI CADASTRAR UM ANIMAL QUE JÁ FOI ADOTADO, PORRA
    if((!provavelAnimal.nome)||(!provavelAnimal.especie)||(!provavelAnimal.porte)||(!provavelAnimal.descricao)||(!provavelAnimal.castrado)||(!provavelAnimal.vacinado)){
      res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
    }else{
      const novoAnimal = await Animal.create({
        nome: provavelAnimal.nome,
        especie: provavelAnimal.especie,
        porte: provavelAnimal.porte,
        castrado: provavelAnimal.castrado || false,
        vacinado: provavelAnimal.vacinado || false,
        descricao: provavelAnimal.descricao,
        foto: provavelAnimal.foto
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
    res.status(500).json({ "erro": "Erro interno ao cadastrar o animal." });
  }
};


const getAnimais = async (req, res) => {
  try{
    const parametros = { 
      especie: req.query.especie, 
      porte: req.query.porte, 
      castrado: req.query.castrado, 
      vacinado: req.query.vacinado 
    };

    let filtros = {};
    
    if(parametros.especie){
      filtros.especie = parametros.especie;
    };

    if(parametros.porte){
      filtros.porte = parametros.porte;
    };

    //=== significa se o parâmetro for igual em valor E tipo
    //!== significa se os o parâmetro for diferente em valor e/ou tipo
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
//ainda tem que colocar proteção nelas

const getAnimaisAdmin = async (req, res) => {
  try{
    const parametros = { 
      id: req.query.id,
      nome: req.query.nome,
      especie: req.query.especie, 
      porte: req.query.porte, 
      castrado: req.query.castrado, 
      vacinado: req.query.vacinado,
      adotado: req.query.adotado,
      createdAt: req.query.createdAt,
      updatedAt: req.query.updatedAt
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

    //dá pra pedir a data só como Ano-Mes-Dia, sem precisar de horário
    if(parametros.createdAt){
        const dataInicio = new Date(parametros.createdAt);
        const dataFim = new Date(parametros.createdAt);
        dataFim.setHours(23, 59, 59, 999);

        filtros.createdAt = {
          [Op.between]: [dataInicio, dataFim]
        };
    };

    //dica de teste de campo que eu descobri agr: 
    //se o campo updatedAt for 2025-09-19 01:58:31.914 +00:00
    //é só usar 2025-09-19T01:58:31.914Z (tem que tirar os espaços (substituir por T, por algum motivo))
    if(parametros.updatedAt){
        const dataInicio = new Date(parametros.updatedAt);
        const dataFim = new Date(parametros.updatedAt);
        dataFim.setHours(23, 59, 59, 999);

        filtros.updatedAt = {
          [Op.between]: [dataInicio, dataFim]
        };
    };

    //usa os filtros, pega os pedidos de adoção de cada bicho junto das informações deles e ordena por ordem do mais antigo até o mais novo
    const animais = await Animal.findAll({
      where: filtros,
      include: {
        model: PedidoAdocao,
        attributes: ['id', 'usuarioId', 'status', 'posicao_fila'],
        order: [['createdAt', 'ASC']]
      },
      order: [["createdAt", "ASC"]]
    });

    res.json({
      "data": animais,
      "total": animais.length
    });

  }catch(error){
    console.log(error)
    res.status(500).json({ "erro": "Erro ao buscar animais" });
  }
};

const getAnimalById = async (req, res) => {
  try{
    const animalBuscado = await Animal.findByPk(req.params.id, { include: {
      model: PedidoAdocao,
      attributes: ['id', 'usuarioId', 'status', 'posicao_fila', 'createdAt'],
      order: [['createdAt', 'ASC']]
    }});

    if(!animalBuscado){
      res.status(404).json({"erro": "Animal não encontrado"});
    }else{
      res.status(200).json(animalBuscado);
    }

  }catch(error){
    console.log(error)
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

      if(Object.keys(req.body).length<1){ 
        res.status(400).json({"erro": "Nenhum campo foi fornecido para atualização"});
      }else{
        res.status(200).json(animalAtualizado);
      }

    }
  }catch(error){
    console.log(error)
    res.status(500).json({"erro": "Erro interno ao atualizar animal"});
  }
};

//falta colocar autenticação aqui
//res.status(403).json({"erro": "Acesso não autorizado"})
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