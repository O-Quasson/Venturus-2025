import {Doacao} from '../models/Modelos.js';

//honório, termine essas rotas
//[insira imagem dos capitão dos penguins de madagascar aqui]
//Kowaski Analize
const postDoacao = async (req, req) => {
    try {
    const novaDoacao = await Doacao.create({
        nome: req.body.nome,
        email: req.body.email,
        valor: req.body.valor,
        linkpix: req.body.linkpix,
        mensagem: req.body.mensagem
    });

    if((!ProvavelDoacao.valor)){
        res.status(400).json({"erro:": "Cade meu dinheiro fela da fruta"});
    }else{
        const NovaDoacao = await Doacao.create({
            valor: ProvavelDoacao.valor
        });

        res.status(201).json({
            id: NovaDoacao.id,
            nome: NovaDoacao.nome,
            email: NovaDoacao.email,
            valor: NovaDoacao.valor,
            linkpix: NovaDoacao.linkpix,
            mensagem: NovaDoacao.mensagem
        })
    }
}
catch (error) {
    console.error('Erro ao registrar a doação', error);
    res.status(500).json({ erro: "Erro interno ao registrar a doação." });
}};

/*const getDoacao = async (req, res) => {
    try{
        const parametros = (
            email: req.body.email,
            linkpix: req.body.linkpix,
            mensagem: req.body.mensagem
        )
    }
};*/

// getDoacao, getDoacoesAdmin, getDoacaoById, patchDoacao, delDoacao
export { postDoacao }
const doacoes = await Doacao.findAll();