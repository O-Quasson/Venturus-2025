import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import UsuarioModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';


export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const connectDB = async () => {
    sequelize.sync();
  
    await sequelize.authenticate();
    console.log("Connected to DB");
};

export const Animal = AnimalModel(sequelize);
export const Usuario = UsuarioModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

//os modelos de tabela vieram sem conecxão
//conecção
//coneção
//correção?
//conecchão
//huh?

Usuario.hasOne(Questionario, {foreignKey: { name: 'usuarioId', allowNull: false}, onDelete: 'CASCADE'});
Questionario.belongsTo(Usuario, {foreignKey: 'usuarioId'});

Usuario.hasMany(PedidoAdocao, { foreignKey: { name: 'usuarioId', allowNull: false}, onDelete: 'CASCADE'});
PedidoAdocao.belongsTo(Usuario, { as: 'Usuario',foreignKey: 'UsuarioId'});

Animal.hasMany(PedidoAdocao, { foreignKey: { name: 'animalId', allowNull: false}, onDelete: 'CASCADE'});
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId'});

// Associações
// Explicação das associações:
// - Um Usuario tem um Questionario.
// - Um Usuario pode ter vários Pedidos de Adoção.
// - Um Animal pode ter vários Pedidos de Adoção.
// A tabela PedidosAdocao serve como uma tabela de junção entre Usuarioes e Animais.

export default { connectDB, sequelize, Animal, Usuario, Questionario, PedidoAdocao, Doacao };
