import {Doacao} from '../models/Modelos.js';
import QRCode from 'qrcode';

//[insira imagem dos capitão dos penguins de madagascar aqui]
//Kowaski Analize

//essa rota não tá terminada
//tem que adicionar linkpix 

//EU TIVE UMA ÓTIMA IDEIA
//QUANDO COLOCAR O QRCODE
//BOTA ESSE EXATO LINK https://www.youtube.com/watch?v=2qBlE2-WL60
//we do a little trolling

const postDoacao = async (req, res) => {
    try {
        const ProvavelDoacao = {
            nome: req.body.nome || 'Anônimo',
            email: req.body.email || 'Anônimo',
            valor: req.body.valor,
            linkPix: `alterar depois`,
            mensagem: req.body.mensagem
        };

        if((!ProvavelDoacao.valor)||(ProvavelDoacao.valor<=0)){
            res.status(400).json({"erro": "Valor da doação é obrigatório e deve ser um número positivo"});
        }else{
            //eu real não sei como funciona link pix
            //o email deveria ser da pessoa que tá doando ou de que tá recebendo a doação?
            //chave personalizada q eu n sei sla bro lmao
            // ProvavelDoacao.linkPix = `00020126580014BR.GOV.BCB.PIX0136${ProvavelDoacao.email}5204000053039865405${ProvavelDoacao.valor.toFixed(2)}5802BR5920${ProvavelDoacao.nome.split(" ")[0]}6009Campinas62070503***6304ABCD`;

            //Tomas permitiu colocar esse link, não me julgue
            ProvavelDoacao.linkPix = `https://www.youtube.com/watch?v=2qBlE2-WL60`
            const NovaDoacao = await Doacao.create(ProvavelDoacao);

            //usar esse aqui se for mandar o qrcode no terminal
            // const qrcodeCriado = await QRCode.toString(ProvavelDoacao.linkPix, { type: 'terminal'});
            
            //usar esse aqui se for gerar qrcode como texto (???????????????????? nem faz sentido)
            //aparentemente é pra usar esse mesmo
            const qrcodeCriado = await QRCode.toDataURL(ProvavelDoacao.linkPix);
            

            res.status(201).json({
                "doacao_id": NovaDoacao.id,
                nome: NovaDoacao.nome,
                valor: NovaDoacao.valor,
                linkPix: NovaDoacao.linkPix,
                qrcodeCriado
            })
        };
    }catch (error) {
        console.log(error)
        res.status(500).json({ "erro": "Erro ao processar a doação." });
    }
};


export default postDoacao;
