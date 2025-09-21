import { PedidoAdocao, Usuario, Animal, Questionario } from "../models/Modelos.js";

//se eu n me engano um usuário pode ter vários pedidos em análise, ent n faz sentido pegar só o PedidoAdocao.findOne

const postAdocoes = async (req, res) => {
    try {
        const coisas = { 
            usuarioProcurado: req.body.usuarioProcurado, 
            animalProcurado: req.body.animalProcurado 
        };
    
        const usuarioEncontrado = await Usuario.findByPk(coisas.usuarioProcurado);
        const animalEncontrado = await Animal.findByPk(coisas.animalProcurado);

        //sem usuarioEncontrado ou animal da erro
        if (!usuarioEncontrado || !animalEncontrado) {
            res.status(404).json({ "erro": "tutor ou animal não encontrado" });
        }else{

            //sem responder o questionario da erro
            const questionario = await Questionario.findOne({ where: { usuarioId: usuarioEncontrado.id } });

            if (!questionario) {
                res.status(400).json({ "erro": "O tutor ainda não respondeu o questionário obrigatório" });
            }else{

                const pedidoExistente = await PedidoAdocao.findOne({
                    where: {
                        usuarioId: usuarioEncontrado.id,
                        animalId: animalEncontrado.id,
                        status: 'em_analise'
                    }
                });

                if (pedidoExistente) {
                    res.status(409).json({ "erro": "Este tutor já tem um pedido de adoção para este animal" });
                }else{

                    const count = await PedidoAdocao.count({
                        where: { animalId:animalEncontrado.id, status: 'em_analise' }
                    });

                    const novoPedido = await PedidoAdocao.create({
                        usuarioId: usuarioEncontrado.id,
                        animalId: animalEncontrado.id,
                        status: 'em_analise',
                        posicao_fila: count + 1,
                    });

                    res.status(201).json({
                        id: novoPedido.id,
                        usuarioId: novoPedido.usuarioId,
                        animalId: novoPedido.animalId,
                        status: novoPedido.status,
                        posicao_fila: novoPedido.posicao_fila,
                        createdAt: novoPedido.createdAt
                    });
                }
            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json({ "erro": "Erro ao registrar o pedido de adoção" });
    };
};

export { postAdocoes };