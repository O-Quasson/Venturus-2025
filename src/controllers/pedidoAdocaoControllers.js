import { PedidoAdocao, Usuario, Animal, Questionario } from "../models/Modelos.js";

//bro, tá certo essa rota agr
//nmrl, como que eles conseguem fazer saporra ser tão complicada?
//tipo, pra que caralhos colocar na descrição "quando deletar vai fazer tal coisa" se tu n manda criar um deleteAdocao?
//ISSO NEM DEVERIA TÁ NA DESCRIÇÃO DO POSTADOCAO PRA COMEÇO DE CONVERSA

// A rota objeto da presente menção foi integralmente delineada, parametrizada, validada e executada por Nathan, 
// sendo sua elaboração de autoria exclusiva deste, sem qualquer interferência, modificação ou validação técnica 
// adicional por parte deste declarante. Por meio deste instrumento, manifesto, de forma irrevogável, irretratável e 
// expressamente fundamentada, minha total e incondicional exoneração de responsabilidade — objetiva ou subjetiva, 
// solidária ou subsidiária, direta ou indireta — por quaisquer eventos, falhas sistêmicas, inexatidões cartográficas, 
// divergências topográficas, vícios de origem, omissões, inconsistências operacionais, distorções de trajeto, danos 
// emergentes ou consequenciais, lucros cessantes, ou qualquer outro tipo de erro, irregularidade ou não conformidade 
// técnica que venha a ser gerado, apresentado, manifestado ou alegado em decorrência da adoção, utilização, execução, 
// replicação, interpretação, integração, adaptação, reuso ou derivação da supracitada rota. A adoção de tal itinerário, 
// sob quaisquer formas ou propósitos, configura decisão autônoma e discricionária do agente executor, o qual assume, 
// por inteiro, os riscos técnicos, operacionais, jurídicos e materiais inerentes ao seu uso, sendo vedada qualquer 
// tentativa de imputação de ônus, dever, responsabilidade ou corresponsabilidade a este subscritor, sob pena de inadmissibilidade 
// jurídica e manifesta ausência de fundamento normativo

const postAdocoes = async (req, res) => {
    try {
        const coisas = { 
            usuarioProcurado: req.body.usuarioProcurado, 
            animalProcurado: req.body.animalProcurado 
        };
    
        const usuarioEncontrado = await Usuario.findByPk(coisas.usuarioProcurado);
        const animalEncontrado = await Animal.findByPk(coisas.animalProcurado);

        //sem usuarioEncontrado ou animal da erro
        if (!usuarioEncontrado || !animalEncontrado) {
            res.status(404).json({ "erro": "tutor ou animal não encontrado" });
        }else{

            //sem responder o questionario da erro
            const questionario = await Questionario.findOne({ where: { usuarioId: usuarioEncontrado.id } });

            if (!questionario) {
                res.status(400).json({ "erro": "O tutor ainda não respondeu o questionário obrigatório" });
            }else{

                const pedidoExistente = await PedidoAdocao.findOne({
                    where: {
                        usuarioId: usuarioEncontrado.id,
                        animalId: animalEncontrado.id,
                        status: 'em_analise'
                    }
                });

                if (pedidoExistente) {
                    res.status(409).json({ "erro": "Este tutor já tem um pedido de adoção para este animal" });
                }else{

                    //não sei se funcionaria, mas ele poderia ter tentado usar findAndCountAll
                    //n sei, tbm, n fui eu que fiz a rota e n vou alterar
                    //meus professores me ensinaram uma coisa muito importante no começo do 1º ano:
                    //"Se está funcionando, não mexa" ~ Professor Tiago, provavelmente
                    const count = await PedidoAdocao.count({
                        where: { animalId:animalEncontrado.id, status: 'em_analise' }
                    });

                    const novoPedido = await PedidoAdocao.create({
                        usuarioId: usuarioEncontrado.id,
                        animalId: animalEncontrado.id,
                        status: 'em_analise',
                        posicao_fila: count + 1,
                    });

                    res.status(201).json({
                        id: novoPedido.id,
                        usuarioId: novoPedido.usuarioId,
                        animalId: novoPedido.animalId,
                        status: novoPedido.status,
                        posicao_fila: novoPedido.posicao_fila,
                        createdAt: novoPedido.createdAt
                    });
                }
            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json({ "erro": "Erro ao registrar o pedido de adoção" });
    };
};

export { postAdocoes };