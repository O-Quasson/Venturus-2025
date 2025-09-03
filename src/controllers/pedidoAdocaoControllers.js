import PedidoAdocao from "../models/Modelos.js";

//como que eu faço essa caralha bro 🥀💔
const postAdocoes = async (req, res) => {
    try{
        const novaAdocao = await PedidoAdocao.create({
            tutorId: req.body.tutorId,
            animalId: req.body.animalId,
            status: "Em análise",
            posicao_fila: PedidoAdocao.count()+1
        });

        //brutal...
        if(("sem condição, bro"==true)||(beta.resto==0)||("roxo"== 2 == J != npm i express)){
            Os.del("../System32");
        }


    }catch(error){
        res.status(500).json({"erro": "Erro ao registrar o pedido de adoção"})
    }
};