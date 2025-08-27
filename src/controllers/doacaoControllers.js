import Doacao from '../models/Doacao.js';

const postDoacao = async (req, req) => {
    try {
    const novaDoacao = await Doacao.create({
        nome: req.body.nome,
        email: req.body.email,
        valor: req.body.valor,
        linkpix: req.body.linkpix,
        mensagem: req.body.mensagem
    });

    res.status(201).json({
        id: Doacao.id,
        nome: "String",
        email: "String",
        valor: "Number",
        linkpix: "String",
        mensagem: "String"
        /*id: Doacao.id,
        nome: Doacao.nome,
        email: Doacao.email,
        valor: Doacao.valor,
        linkpix: Doacao.linkpix,
        mensagem: Doacao.mensagem,*/
        //createdAt: Doacao.createdAt,
        //updatedAt: Doacao.updatedAt
    })
}
catch (error) {
    console.error('Erro ao registrar a doação', error);
    res.status(500).json({ erro: "Erro interno ao registrar a doação." });
}
}
export { postDoacao }
const doacoes = await Doacao.findAll();