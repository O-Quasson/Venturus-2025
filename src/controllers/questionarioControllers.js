import Questionario from "../models/Questionario";

const postQuestionario = async (req, res) => {
    try{
        const novoQuestionario = await Questionario.create({
            
        });

    }catch(error){
        res.status(500).json({"erro": "Erro interno ao responder o questionário"})
    };
};