import {Usuario, Questionario } from "../models/Modelos.js";

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
        const usuarioProcurado = await Usuario.findByPk(req.params.id, {include: Questionario });

        if(!usuarioProcurado){
            res.status(404).json({"erro": "Tutor não encontrado"});
        }else{
            res.status(200).json({
              "id": "uuid",
              "nome_completo": "string",
              "rg": "string",
              "endereco": "string",
              "bairro": "string",
              "cidade": "string",
              "estado": "string",
              "celular": "string",
              "telefone": "string",
              "email": "string",
              "instagram": "string",
              "facebook": "string",
              "questionario": {
                "empregado": true,
                "quantos_animais_possui": 2,
                "motivos_para_adotar": "string",
                "quem_vai_sustentar_o_animal": "string",
                "numero_adultos_na_casa": 2,
                "numero_criancas_na_casa": 1,
                "idades_criancas": \["5"\],
                "residencia_tipo": "própria",
                "proprietario_permite_animais": true,
                "todos_de_acordo_com_adocao": true,
                "responsavel_pelo_animal": "string",
                "responsavel_concorda_com_adocao": true,
                "ha_alergico_ou_pessoas_que_nao_gostam": false,
                "gasto_mensal_estimado": 300,
                "valor_disponivel_no_orcamento": true,
                "tipo_alimentacao": "rações premium",
                "local_que_o_animal_vai_ficar": "quintal",
                "forma_de_permanencia": "solto 24h",
                "forma_de_confinamento": "nenhum",
                "tera_brinquedos": true,
                "tera_abrigo": true,
                "tera_passeios_acompanhado": true,
                "tera_passeios_sozinho": false,
                "companhia_outro_animal": true,
                "companhia_humana_24h": true,
                "companhia_humana_parcial": false,
                "sem_companhia_humana": false,
                "sem_companhia_animal": false,
                "o_que_faz_em_viagem": "deixa com parente",
                "o_que_faz_se_fugir": "procura imediatamente",
                "o_que_faz_se_nao_puder_criar": "procura nova família",
                "animais_que_ja_criou": "2 cães, 1 gato",
                "destino_animais_anteriores": "todos faleceram de velhice",
                "costuma_esterilizar": true,
                "costuma_vacinar": true,
                "costuma_vermifugar": true,
                "veterinario_usual": "Clínica PetVida",
                "forma_de_educar": "reforço positivo",
                "envia_fotos_e_videos_do_local": true,
                "aceita_visitas_e_fotos_do_animal": true,
                "topa_entrar_grupo_adotantes": true,
                "concorda_com_taxa_adocao": true,
                "data_disponivel_para_buscar_animal": "2024-12-20"
                }
            })
        };

    }catch(error){
        res.status(500).json({"erro": "Erro ao buscar dados do tutor"});
    }
};

export { postUsuario, getUsuarioById, patchUsuario  }