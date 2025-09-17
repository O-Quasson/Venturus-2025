import { PedidoAdocao, Usuario, Animal, Questionario } from "../models/Modelos.js";

const postAdocoes = async (req, res) => {
    try {
        const { usuarioId, animalId } = req.body;

        // Verifica se o tutor e o animal existem
        const tutor = await Usuario.findByPk(usuarioId);
        const animal = await Animal.findByPk(animalId);

        if (!tutor || !animal) {
            return res.status(404).json({ "erro": "Tutor ou animal não encontrado" });
        }

        // Verifica se o tutor respondeu ao questionário obrigatório
        const questionario = await Questionario.findAll({ where: { usuarioId } });
        if (!questionario) {
            return res.status(400).json({ "erro": "O tutor ainda não respondeu o questionário obrigatório" });
        }

        // Verifica se já existe um pedido ativo para este tutor e animal
        const pedidoExistente = await PedidoAdocao.findAll({
            where: { usuarioId, animalId, status: 'em_analise' }
        });

        if (pedidoExistente) {
            return res.status(409).json({ "erro": "Este tutor já tem um pedido de adoção para este animal" });
        }

        // Conta os pedidos em análise para o animal para definir a posição na fila
        const count = await PedidoAdocao.count({
            where: { animalId, status: 'em_analise' }
        });

        // Cria o novo pedido de adoção
        const novoPedido = await PedidoAdocao.create({
            usuarioId,
            animalId,
            status: 'em_analise',
            posicao_fila: count + 1
        });

        res.status(201).json({
            id: novoPedido.id,
            tutor_id: novoPedido.usuarioId,
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