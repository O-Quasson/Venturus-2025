import {Usuario, Questionario } from "../models/Modelos.js";
import omit from "lodash.omit";
//eu tive que importar a porra de uma biblioteca só pra pegar essa caralha de omit, que merda

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//alguém me mata, por favor
//ok google, faça esse trabalho para mim, eu imploro por favor

//essa rota tá errada, algm arruma 😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭
// eu nao fiz nadaaaaaa e eu tomei no aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// sla como faz isso bro
// cara é só fazer, bruh
// então faz vc otário
// blz, vou fazer aqui seu buxa
// buxa é vc
// tua mãe é minha cala a boca
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
            celular: req.body.celular || '',
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            bairro: req.body.bairro || '',
            cep: req.body.cep || '',
            instagram: req.body.instagram || '',
            facebook: req.body.facebook || '',
            questionario: req.body.questionario || null
        });

        if((!provavelUsuario.nome_completo) || (!provavelUsuario.email) || (!provavelUsuario.senha) || (!provavelUsuario.cidade) || (!provavelUsuario.estado) || (!provavelUsuario.idade) || (!provavelUsuario.telefone) || (!provavelUsuario.cpf) || (!provavelUsuario.endereco)){
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
                });

                //placeholder, mudar depois
                //se tiver mandado um questionario, cria um registro de questionario com o id do usuário
                if(provavelUsuario.questionario){
                    provavelUsuario.questionario.usuarioId = novoUsuario.id;
                    const questionarioFeito = await Questionario.create(provavelUsuario.questionario);
                };

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
        res.status(500).json({ "erro": "Erro interno ao cadastrar o tutor." });
    }
}

//a partir daqui são rotas de ADMIN, não escrevam nada além de rotas de admin aqui

//falta pegar questionário do usuário
const patchUsuario = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id, { include: Questionario });

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{

            if(Object.keys(req.body).length<1){ 
                res.status(400).json({"erro": "Pelo menos um campo deve ser enviado para atualização"});
            }else{ 

                //esse omit serve só pra passar o usuário atualizado sem o questionário, pq senão o questionário daria erro no código, pq n tem um campo questionário na tabela de usuário
                const usuarioAtualizado = await usuarioProcurado.update(omit(req.body, ['questionario']));

                if(req.body.questionario){
                    if (usuarioProcurado.questionario) {
                        await usuarioProcurado.questionario.update(req.body.questionario);
                    }else{
                        req.body.questionario.usuarioId = usuarioProcurado.id;
                        await Questionario.create(req.body.questionario);
                    }
                }

                const questionarioFeito = await Questionario.findOne({where: {
                    usuarioId: usuarioAtualizado.id
                }});

                res.status(200).json({
                    "id": usuarioAtualizado.id,
                    "nome_completo": usuarioAtualizado.nome_completo,
                    "email": usuarioAtualizado.email,
                    "cidade": usuarioAtualizado.cidade,
                    "estado": usuarioAtualizado.estado,
                    "questionario": questionarioFeito
                });
            }   

        };
            
    }catch(error){
        res.status(500).json({"erro": "Erro ao atualizar os dados do tutor"});
    }
};

const getUsuarioById = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id, {include: Questionario });

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{
            res.status(200).json(usuarioProcurado);
        };

    }catch(error){
        res.status(500).json({"erro": "Erro ao buscar dados do tutor"});
    }
};

export { postUsuario, getUsuarioById, patchUsuario  }