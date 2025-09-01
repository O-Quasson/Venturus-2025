import { DataTypes } from 'sequelize';

const PedidoAdocao = (sequelize) => {
    const PedidoAdocao = sequelize.define('PedidoAdocao', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        tutorId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        animalId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'em_analise',
            allowNull: false
        },
        posicao_fila: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: 'pedidos_adocao',
        timestamps: true
    });

    return PedidoAdocao;
};

export default PedidoAdocao;