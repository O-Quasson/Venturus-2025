import {Doacao} from '../models/Modelos.js';

//[insira imagem dos capitão dos penguins de madagascar aqui]
//Kowaski Analize

const postDoacao = async (req, res) => {
    try {
        const ProvavelDoacao = {
            nome: req.body.nome || 'Anônimo',
            email: req.body.email || 'Anônimo',
            valor: req.body.valor,
            linkPix: req.body.linkPix,
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
                linkPix: NovaDoacao.linkPix,
                //uhhhh... como que a gente coloca qr code aqui?????????
            })
        };
    }catch (error) {
        console.log(error)
        res.status(500).json({ "erro": "Erro ao processar a doação." });
    }
};


export default postDoacao;