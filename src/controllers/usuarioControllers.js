import encryptjs from "encryptjs";
import {Usuario, Questionario } from "../models/Modelos.js";
import omit from "lodash.omit";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secreta = "teambluududjointoday!!!"; //chave segura

const criptografarSenha = (senha) => {
    const senhaCriptografada = encryptjs.encrypt(senha, secreta, 256);
    return senhaCriptografada;
};

const descriptografarSenha = (senhaCriptografada) => {
    const senhaDescriptografada = encryptjs.decrypt(senhaCriptografada, secreta, 256);
    return senhaDescriptografada;
};

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
            cpf: req.body.cpf || '',
            endereco: req.body.endereco || '',
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
                const senhaCriptografada = criptografarSenha(provavelUsuario.senha);

                const novoUsuario = await Usuario.create({
                    nome_completo: req.body.nome_completo,
                    email: req.body.email,
                    senha: senhaCriptografada,
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

                if(provavelUsuario.questionario){
                    provavelUsuario.questionario.tutorId = novoUsuario.id;
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
        console.log(error)
        res.status(500).json({ "erro": "Erro interno ao cadastrar o tutor." });
    }
}

const postLogin = async (req, res) => {
    try{

        const usuarioAutenticado = {
            email: req.body.email,
            senha: req.body.senha
        };

        const procuraUsuario = await Usuario.findOne({ where: {
            email: usuarioAutenticado.email
        }});
        
        if(!procuraUsuario){
            res.status(401).json({"erro": "Email ou senha inválidos."});
        }else{
            const senhaDescriptografada = descriptografarSenha(procuraUsuario.senha);
            if(senhaDescriptografada!=usuarioAutenticado.senha){
                res.status(401).json({"erro": "Email ou senha inválidos."});
            }else{
                const token = jwt.sign({id: procuraUsuario.id, email: procuraUsuario.email, administrador: procuraUsuario.administrador}, secreta, {expiresIn: '1h'});
                res.status(200).json({"message": "Login realizado com sucesso."});
                console.log(token)
            }
            
        }

    }catch(error){
        console.log(error)
        res.status(500).json({"erro": "Erro interno ao tentar fazer o login."})
    }
}

//a partir daqui são rotas de ADMIN, não escrevam nada além de rotas de admin aqui

const patchUsuario = async (req, res) => {
    try{
        const usuarioProcurado = await Usuario.findByPk(req.params.id, { include: Questionario });

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{

            if(Object.keys(req.body).length<1){

                res.status(400).json({"erro": "Pelo menos um campo deve ser enviado para atualização"});
            }else{ 
                if (req.body.senha) {
                    req.body.senha = criptografarSenha(req.body.senha);
                }
                //google pesquisar npm omit data from object 
                //esse omit serve só pra passar o usuário atualizado sem o questionário, pq senão o questionário daria erro no código, pq n tem um campo questionário na tabela de usuário
                const usuarioAtualizado = await usuarioProcurado.update(omit(req.body, ['questionario']));

                if(req.body.questionario){
                    if (usuarioProcurado.questionario) {
                        //sinceramente, não entendi o que vocês fizeram nessa linha aqui
                        await usuarioProcurado.questionario.update(req.body.questionario);
                    }else{
                        req.body.questionario.tutorId = usuarioProcurado.id;
                        await Questionario.create(req.body.questionario);
                    }
                }

                const questionarioFeito = await Questionario.findOne({where: {
                    tutorId: usuarioAtualizado.id
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
        let usuarioProcurado = await Usuario.findByPk(req.params.id, {include: Questionario });

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{
            //dá erro se não converter para json
            //TypeError: Converting circular structure to JSON
            usuarioProcurado = usuarioProcurado.toJSON();
            usuarioProcurado.Questionario = omit(usuarioProcurado.Questionario, ['id','createdAt', 'updatedAt', 'tutorId']);
            res.status(200).json(omit(usuarioProcurado, ['senha', 'cep', 'idade', 'createdAt', 'updatedAt', 'administrador']));
        };

    }catch(error){
        console.log(error)
        res.status(500).json({"erro": "Erro ao buscar dados do tutor"});
    }
};

export { postUsuario, getUsuarioById, patchUsuario, postLogin  }