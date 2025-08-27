import Usuario from "../models/Usuario.js";

const postUsuario = async (req, res) => {
    try{
    const novoUsuario = await Usuario.create({
        nome_completo: req.body.nome_completo,
        email: req.body.email,
        senha: req.body.senha,
        cidade: req.body.cidade,
        estado: req.body.estado,
        idade: req.body.idade,
        telefone: req.body.telefone,
        celular: req.body.celular,
        cpf: req.body.cpf,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        administrador: req.body.administrador,
    });
    res.status(201).json({
        id: novoUsuario.id,
        nome_completo: "string",
        senha:"string",
        email: "string",
        cidade: "string",
        estado: "string",
        idade: "number",
        telefone: "number",
        instagram: "string",
        facebook: "string"
    });
}catch (error) {
    console.error('Erro ao cadastrar tutor:', error);
    res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
  }
}
export { postUsuario }
const usuarios = await Usuario.findAll()

