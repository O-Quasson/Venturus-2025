import {Usuario, Questionario} from "../models/Modelos.js";

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//alguém me mata, por favor
//ok google, faça esse trabalho para mim, eu imploro por favor

//essa rota tá errada, algm arruma 😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭
//*Descrição*: Cadastra um novo usuario com seus dados. O questionário pode ou não ser enviado junto ao cadastro do usuário.
const postUsuario = async (req, res) => {
    try{
        const provavelUsuario = ({
            nome_completo: req.body.nome_completo,
            email: req.body.email,
            senha: req.body.senha,
            cidade: req.body.cidade,
            estado: req.body.estado,
            idade: req.body.idade,
            telefone: req.body.telefone,
            celular: req.body.celular,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            administrador: req.body.administrador,
        });

        if(Object.keys(provavelUsuario)==""){
            res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
        }else{

            const emailExiste = await Usuario.findOne({
                where: {
                    email: provavelUsuario.email
                }
            });

            if(!emailExiste){

                const novoUsuario = await Usuario.create({
                    nome_completo: req.body.nome_completo,
                    email: req.body.email,
                    senha: req.body.senha,
                    cidade: req.body.cidade,
                    estado: req.body.estado,
                    idade: req.body.idade,
                    telefone: req.body.telefone,
                    celular: req.body.celular,
                    cpf: req.body.cpf,
                    endereco: req.body.endereco,
                    bairro: req.body.bairro,
                    cep: req.body.cep,
                    instagram: req.body.instagram,
                    facebook: req.body.facebook,
                    administrador: req.body.administrador,
                });

                res.status(201).json({
                    id: novoUsuario.id,
                    nome_completo: novoUsuario.nome_completo,
                    senha:novoUsuario.senha,
                    email: novoUsuario.email,
                    cidade: novoUsuario.cidade,
                    estado: novoUsuario.estado,
                    idade: novoUsuario.idade,
                    telefone: novoUsuario.telefone,
                    instagram: novoUsuario.instagram,
                    facebook: novoUsuario.facebook
                });
            }else{
                res.status(400).json({"erro": "Email preenchido já está sendo utilizado."});
            }
            
        }
    }catch (error) {
        console.error('Erro ao cadastrar tutor:', error);
        res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
}

//a partir daqui são rotas de ADMIN, não escrevam nada além de rotas de admin aqui
//essa porra tá incompleta pq eu n sei como continuar
//como caralhos eu pego o questionário do filho da puta do usuário?
const patchUsuario = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id);

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{
            const usuarioAtualizado = {
                nome_completo: req.body.nome_completo,
                email: req.body.email,
                senha: req.body.senha,
                cidade: req.body.cidade,
                estado: req.body.estado,
                idade: req.body.idade,
                telefone: req.body.telefone,
                celular: req.body.celular,
                cpf: req.body.cpf,
                endereco: req.body.endereco,
                bairro: req.body.bairro,
                cep: req.body.cep,
                instagram: req.body.instagram,
                facebook: req.body.facebook,
                administrador: req.body.administrador,
            };


        };
            
    }catch(error){
        res.status(500).json({"erro": "Erro ao atualizar os dados do tutor"});
    }
};

const getUsuarioById = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id);

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"})`;`
        }else{
            
        };

    }catch(error){
        res.status(500).jsilksong({"erro": "Erro ao buscar dados do tutor"});
    }
};

export { postUsuario }