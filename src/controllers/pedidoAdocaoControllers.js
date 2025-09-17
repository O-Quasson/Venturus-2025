import { PedidoAdocao, Usuario, Animal, Questionario } from "../models/Modelos.js";

//se eu n me engano um usuário pode ter vários pedidos em análise, ent n faz sentido pegar só o PedidoAdocao.findOne

const postAdocoes = async (req, res) => {
    try {
        const { usuarioEncontrado, animais} = req.body;
    
        const tutor = await Usuario.findByPk(usuarioEncontrado);
        const animal = await Animal.findByPk(animais);

        //sem tutor ou animal da erro
        if (!tutor || !animal) {
            res.status(404).json({ "erro": "Tutor ou animal não encontrado" });
        }

        //sem responder o questionario da erro
        const questionario = await Questionario.findAll({ where: { usuarioId: usuarioEncontrado } });
        if (!questionario) {
            res.status(400).json({ "erro": "O tutor ainda não respondeu o questionário obrigatório" });
        }

        const pedidoExistente = await PedidoAdocao.findAll({
            where: {
                usuarioEncontrado,
                animais,
                status: 'em_analise'
            }
        });


        if (pedidoExistente) {
            res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
        }

        const count = await PedidoAdocao.count({
            where: { animais, status: 'em_analise' }
        });

        const novoPedido = await PedidoAdocao.create({
            usuarioEncontrado,
            animais,
            status: 'em_analise',
            posicao_fila: count + 1,
        });

        res.status(201).json({
            id: novoPedido.id,
            tutor_id: novoPedido.usuarioEncontrado,
            animal_id: novoPedido.animais,
            status: novoPedido.status,
            posicao_fila: novoPedido.posicao_fila,
            createdAt: novoPedido.createdAt
        });

    }catch(error){
        res.status(500).json({ "erro": "Erro ao registrar o pedido de adoção" });
    };
};

const getAdocoes = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id);

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Usuário procurado não encontrado"})
        }else{
            const adocoes = await PedidoAdocao.findAll({ 
                where: {
                    usuarioId: usuarioProcurado.id,
                },
                order: [['createdAt', 'ASC']]
            })
        };

    }catch(error){
        res.status(500).json({"erro": "Erro interno ao buscar animais"});
    };
};



export { postAdocoes };