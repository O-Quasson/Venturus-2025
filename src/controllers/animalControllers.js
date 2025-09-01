import Animal from "../models/Animal";

const postAnimal = async (req, res) => {
  try {
    const animal = await Animal.create({
      nome: req.body.nome,
      especie: req.body.especie,
      porte: req.body.porte,
      castrado: req.body.castrado || false,
      vacinado: req.body.vacinado || false,
      descricao: req.body.descricao || '',
      foto: req.body.foto || null
    });

    res.status(201).json({
      id: animal.id,
      nome: animal.nome,
      especie: animal.especie,
      porte: animal.porte,
      castrado: animal.castrado,
      vacinado: animal.vacinado,
      descricao: animal.descricao,
      foto: animal.foto,
    });

  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
  }
};


const animais = await Animal.findAll();

export { createAnimal }