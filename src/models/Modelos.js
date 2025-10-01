    import { Sequelize } from 'sequelize';
    import AnimalModel from './Animal.js';
    import UsuarioModel from './Usuario.js';
    import QuestionarioModel from './Questionario.js';
    import PedidoAdocaoModel from './PedidoAdocao.js';
    import DoacaoModel from './Doacao.js';


    export const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        // username: 'postgres',
        // password: '1234',
        // database: 'postgres',
        // host: 'db.bmvbmhpjhosqikpnmcpz.supabase.co',
        // port: 5432,
        // dialect: 'postgres',
        // logging: false
    });

    // postgresql://postgres:[YOUR-PASSWORD]@db.bmvbmhpjhosqikpnmcpz.supabase.co:5432/postgres

    export const connectDB = async () => {
        
        await sequelize.sync();
    
        await sequelize.authenticate();

        //seed
        //do you hear the whistle?

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

    Usuario.hasOne(Questionario, {foreignKey: { name: 'tutorId', allowNull: false}, onDelete: 'CASCADE'});
    Questionario.belongsTo(Usuario, {foreignKey: 'tutorId'});

    Usuario.hasMany(PedidoAdocao, { foreignKey: { name: 'usuarioId', allowNull: false}, onDelete: 'CASCADE'});
    PedidoAdocao.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'usuarioId'});

    Animal.hasMany(PedidoAdocao, { foreignKey: { name: 'animalId', allowNull: false}, onDelete: 'CASCADE'});
    PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId'});

    // Associações
    // Explicação das associações:
    // - Um Usuario tem um Questionario.
    // - Um Usuario pode ter vários Pedidos de Adoção.
    // - Um Animal pode ter vários Pedidos de Adoção.
    // A tabela PedidosAdocao serve como uma tabela de junção entre Usuarioes e Animais.

    export default { connectDB, sequelize, Animal, Usuario, Questionario, PedidoAdocao, Doacao };
