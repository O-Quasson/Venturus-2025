import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Doacao = sequelize.define('Doacao', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        //eles realmente não querem receber doações anônimas 💀
        nome: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING,
            allowNull: true
        },
        valor: { 
            type: DataTypes.FLOAT,
            allowNull: false 
        },
        linkPix: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        //"nada a comentar", comentou o comentador do jornal comentários de um comentador
        //é tipo a danistella no debate, bro
        //você é obrigado a falar alguma coisa
        //nah, fds vc *envia só um espaço e uma vírgula na mensagem*
        mensagem: {
            type: DataTypes.STRING,
            allowNull: false 
        },

        
    }, {
        tableName: 'doacoes',
        timestamps: true
    });

    return Doacao;
};