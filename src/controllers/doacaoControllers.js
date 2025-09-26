import {Doacao} from '../models/Modelos.js';
import QRCode from 'qrcode';

//[insira imagem dos capitão dos penguins de madagascar aqui]
//Kowaski Analize

//essa rota não tá terminada
//tem que adicionar linkpix e qrcode
//como caralhos adiciona qrcode bruhhhhhhhhhhhhhhhhhhhhhhhh
//EU TIVE UMA ÓTIMA IDEIA
//QUANDO COLOCAR O QRCODE
//BOTA ESSE EXATO LINK https://www.youtube.com/watch?v=2qBlE2-WL60
//we do a little trolling
// Still water + adrenaline + noradrenaline + hawk tuah + anger issues + balkan parents + english or Spanish + 
// german stare + Balkan rage + jonkler laugh + phonk +Belgian edging + Baltic farting + bulgarian scratching + 
// aggressive slovakian jelqing + polish footjob + indian respect moment those who know + Opponent uses Jamaican Smile + 
// Russian Frown + Finnish wave + Icelandic blink + Thai grin + Hungarian punch + Swiss climb + Argentinian flex + 
// Chilean dance + Peruvian squat + Kenyan grin + Jamaican jump + Russian slide + Filipino stretch + Balkan climb + 
// Greek dash + Egyptian tilt + Vietnamese sit + American hop + Pakistani stomp + Hungarian march + Italian march + 
// Japanese snap + German slide + Irish dash + Brazilian whistle + Turkish flick + French leap + Korean twist + 
// Canadian clap + Indian bow + Nigerian stare + Italian kick + Chinese lean + Scottish grin + Mexican swing + Swedish dash + 
// Moroccan leap + Ukrainian stretch + Danish whistle + Finnish kick + Icelandic jump + Thai clap + Hungarian dash + 
// Swiss stretch + Argentinian whistle + Chilean wink + Peruvian hop + Kenyan sprint + Jamaican whistle + Russian clap + 
// Filipino nod + Balkan bend + Greek run + Egyptian squat + Vietnamese smile + American point + Pakistani twist + Japanese wink + 
// German bow + Irish hop + Brazilian cheer + Turkish skip + French flex + Korean dance + Canadian tiptoe + Indian dash + Nigerian hop + 
// Italian leap + Chinese nod + Scottish sprint + Mexican cheer + Swedish stretch + Moroccan bow + Ukrainian flex + Danish leap + 
// Finnish slide + Swiss gaze + Hungarian lean + Swiss tap + Chilean sprint + Peruvian wave + Jamaican knit + Russian eat + 
// Icelandic stare + Thai skip + Hungarian wink + Swiss tiptoe + Argentinian point + Chilean clap + Peruvian lean + Kenyan dash + 
// Indian dash + Dutch wave + Polish work + Scottish lean + Swedish whistle + Moroccan skip + Ukrainian lean + Danish dive + Finnish flex + 
// Icelandic tilt + Thai flick + Indian whistle + Swedish dash

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
            
            ProvavelDoacao.linkPix = `00020126580014BR.GOV.BCB.PIX0136chavepix-ficticia@exemplo.com5204000053039865405${ProvavelDoacao.valor.toFixed(2)}5802BR5920NomeExemploFictício6009SaoPaulo62070503***6304ABCD`
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

//lmao só tem uma rota aqui
//sei lá, um getdoacoes não seria ruim, mas eu nem fudendo vou fazer isso se eu n for obrigado

export default postDoacao;