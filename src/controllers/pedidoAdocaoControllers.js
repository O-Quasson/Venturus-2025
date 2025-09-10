import { PedidoAdocao, Usuario, Animal, Questionario } from "../models/Modelos.js";

const postAdocoes = async (req, res) => {
    try {
        const { tutorId, animalId } = req.body;

        if (!tutorId || !animalId) {
            res.status(400).json({ erro: "tutorId e animalId são obrigatórios." });
        }

        const tutor = await Usuario.findByPk(tutorId);
        const animal = await Animal.findByPk(animalId);

        if (!tutor || !animal) {
            res.status(404).json({ erro: "Tutor ou animal não encontrado" });
        }

        const questionario = await Questionario.findOne({ where: { usuarioId: tutorId } });
        if (!questionario) {
            res.status(400).json({ erro: "O tutor ainda não respondeu o questionário obrigatório" });
        }

        const pedidoExistente = await PedidoAdocao.findOne({
            where: {
                tutorId,
                animalId,
                status: 'em_analise'
            }
        });

        if (pedidoExistente) {
            res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
        }

        const count = await PedidoAdocao.count({
            where: { animalId, status: 'em_analise' }
        });

        const novoPedido = await PedidoAdocao.create({
            tutorId,
            animalId,
            status: 'em_analise',
            posicao_fila: count + 1
        });

        res.status(201).json({
            id: novoPedido.id,
            tutor_id: novoPedido.tutorId,
            animal_id: novoPedido.animalId,
            status: novoPedido.status,
            posicao_fila: novoPedido.posicao_fila,
            criado_em: novoPedido.createdAt
        });

    } catch (error) {
        res.status(500).json({ "erro": "Erro ao registrar o pedido de adoção" });
    }
};

export { postAdocoes };