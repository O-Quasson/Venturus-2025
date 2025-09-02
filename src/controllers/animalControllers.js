import Animal from "../models/Animal.js";

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
    
    if(Object.keys(provavelAnimal)==""){
      res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
    }else{
      const novoAnimal = await Animal.create({
        nome: provavelAnimal.nome,
        especie: provavelAnimal.especie,
        porte: provavelAnimal.porte,
        castrado: provavelAnimal.castrado || false,
        vacinado: provavelAnimal.vacinado || false,
        descricao: provavelAnimal.descricao || '',
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
      const animais = await Animal.findAll();
      res.status(201).json({ "data": animais, "total": animais.length });
    }catch(error){
      res.status(500).json({ "erro": "Erro ao buscar animais" });
    }
};



export { postAnimal, getAnimais }