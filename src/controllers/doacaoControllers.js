import {Doacao} from '../models/Modelos.js';

//[insira imagem dos capitão dos penguins de madagascar aqui]
//Kowaski Analize

const postDoacao = async (req, res) => {
    try {
        const ProvavelDoacao = {
            nome: req.body.nome || 'Anônimo',
            email: req.body.email || 'Anônimo',
            valor: req.body.valor,
            linkpix: req.body.linkpix || '',
            mensagem: req.body.mensagem || ''
        };

        if((!ProvavelDoacao.valor)||(ProvavelDoacao.valor<=0)){
            res.status(400).json({"erro": "Valor da doação é obrigatório e deve ser um número positivo"});
        }else{
            const NovaDoacao = await Doacao.create(ProvavelDoacao);

            res.status(201).json({
                "doacao_id": NovaDoacao.id,
                nome: NovaDoacao.nome,
                valor: NovaDoacao.valor,
                linkpix: NovaDoacao.linkpix,
                //uhhhh... como que a gente coloca qr code aqui?????????
            })
        };
    }catch (error) {
        res.status(500).json({ "erro": "Erro ao processar a doação." });
    }
};


export { postDoacao }