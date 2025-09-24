import { Questionario, Usuario } from "../models/Modelos.js";

const postQuestionario = async (req, res) => {
    try{ 
        // a vtmnc, olha o tamanho dessa porra
        // mas nem por um caralho eu tento cadastrar um questionario junto de usuário pra teste
        // é, eu acabei tendo que escrever toda essa porra pra testar, vtmnc
        const provavelQuestionario = ({
            usuarioId: req.body.usuarioId,
            empregado: req.body.empregado || false,
            quantos_animais_possui: req.body.quantos_animais_possui,
            motivos_para_adotar: req.body.motivos_para_adotar,
            quem_vai_sustentar_o_animal: req.body.quem_vai_sustentar_o_animal,
            numero_adultos_na_casa: req.body.numero_adultos_na_casa,
            numero_criancas_na_casa: req.body.numero_criancas_na_casa,
            idades_criancas: req.body.idades_criancas || 'Não tenho crianças',
            residencia_tipo: req.body.residencia_tipo,
            proprietario_permite_animais: req.body.proprietario_permite_animais,
            todos_de_acordo_com_adocao: req.body.todos_de_acordo_com_adocao,
            responsavel_pelo_animal: req.body.responsavel_pelo_animal,
            responsavel_concorda_com_adocao: req.body.responsavel_concorda_com_adocao,
            ha_alergico_ou_pessoas_que_nao_gostam: req.body.ha_alergico_ou_pessoas_que_nao_gostam,
            gasto_mensal_estimado: req.body.gasto_mensal_estimado,
            valor_disponivel_no_orcamento: req.body.valor_disponivel_no_orcamento,
            tipo_alimentacao: req.body.tipo_alimentacao,
            local_que_o_animal_vai_ficar: req.body.local_que_o_animal_vai_ficar,
            forma_de_permanencia: req.body.forma_de_permanencia,
            forma_de_confinamento: req.body.forma_de_confinamento,
            tera_brinquedos: req.body.tera_brinquedos,
            tera_abrigo: req.body.tera_abrigo,
            tera_passeios_acompanhado: req.body.tera_passeios_acompanhado,
            tera_passeios_sozinho: req.body.tera_passeios_sozinho,
            companhia_outro_animal: req.body.companhia_outro_animal,
            companhia_humana_24h: req.body.companhia_humana_24h,
            companhia_humana_parcial: req.body.companhia_humana_parcial,
            sem_companhia_humana: req.body.sem_companhia_humana,
            sem_companhia_animal: req.body.sem_companhia_animal,
            o_que_faz_em_viagem: req.body.o_que_faz_em_viagem,
            o_que_faz_se_fugir: req.body.o_que_faz_se_fugir,
            o_que_faz_se_nao_puder_criar: req.body.o_que_faz_se_nao_puder_criar,
            animais_que_ja_criou: req.body.animais_que_ja_criou,
            destino_animais_anteriores: req.body.destino_animais_anteriores,
            costuma_esterilizar: req.body.costuma_esterilizar,
            costuma_vacinar: req.body.costuma_vacinar,
            costuma_vermifugar: req.body.costuma_vermifugar,
            veterinario_usual: req.body.veterinario_usual,
            forma_de_educar: req.body.forma_de_educar,
            envia_fotos_e_videos_do_local: req.body.envia_fotos_e_videos_do_local,
            aceita_visitas_e_fotos_do_animal: req.body.aceita_visitas_e_fotos_do_animal,
            topa_entrar_grupo_adotantes: req.body.topa_entrar_grupo_adotantes,
            concorda_com_taxa_adocao: req.body.concorda_com_taxa_adocao,
            data_disponivel_para_buscar_animal: req.body.data_disponivel_para_buscar_animal
        });

        //por que não tem um res.status para usuário inexistente, bruh?
        const usuarioExistente = await Usuario.findByPk(provavelQuestionario.usuarioId);

        //bro, como que faz isso não ser um if gigante? pq essa porra definitivamente não vai funcionar
        // sla mn vai na fé
        //descobri o .filter lmaoooo
        const faltando = Object.keys(provavelQuestionario).filter(campo => provavelQuestionario[campo] === undefined || provavelQuestionario[campo] === null || provavelQuestionario[campo] === "");
        
        if(faltando.length>0){
            res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
        }else{

            //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            //NÃO, ISSO DNV NAAAAAAAAAAAAAAAAAAAAAAAAAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            const novoQuestionario = await Questionario.create({
                usuarioId: provavelQuestionario.usuarioId,
                empregado: provavelQuestionario.empregado,
                quantos_animais_possui: provavelQuestionario.quantos_animais_possui,
                motivos_para_adotar: provavelQuestionario.motivos_para_adotar,
                quem_vai_sustentar_o_animal: provavelQuestionario.quem_vai_sustentar_o_animal,
                numero_adultos_na_casa: provavelQuestionario.numero_adultos_na_casa,
                numero_criancas_na_casa: provavelQuestionario.numero_criancas_na_casa,
                idades_criancas: provavelQuestionario.idades_criancas,
                residencia_tipo: provavelQuestionario.residencia_tipo,
                proprietario_permite_animais: provavelQuestionario.proprietario_permite_animais,
                todos_de_acordo_com_adocao: provavelQuestionario.todos_de_acordo_com_adocao,
                responsavel_pelo_animal: provavelQuestionario.responsavel_pelo_animal,
                responsavel_concorda_com_adocao: provavelQuestionario.responsavel_concorda_com_adocao,
                ha_alergico_ou_pessoas_que_nao_gostam: provavelQuestionario.ha_alergico_ou_pessoas_que_nao_gostam,
                gasto_mensal_estimado: provavelQuestionario.gasto_mensal_estimado,
                valor_disponivel_no_orcamento: provavelQuestionario.valor_disponivel_no_orcamento,
                tipo_alimentacao: provavelQuestionario.tipo_alimentacao,
                local_que_o_animal_vai_ficar: provavelQuestionario.local_que_o_animal_vai_ficar,
                forma_de_permanencia: provavelQuestionario.forma_de_permanencia,
                forma_de_confinamento: provavelQuestionario.forma_de_confinamento,
                tera_brinquedos: provavelQuestionario.tera_brinquedos,
                tera_abrigo: provavelQuestionario.tera_abrigo,
                tera_passeios_acompanhado: provavelQuestionario.tera_passeios_acompanhado,
                tera_passeios_sozinho: provavelQuestionario.tera_passeios_sozinho,
                companhia_outro_animal: provavelQuestionario.companhia_outro_animal,
                companhia_humana_24h: provavelQuestionario.companhia_humana_24h,
                companhia_humana_parcial: provavelQuestionario.companhia_humana_parcial,
                sem_companhia_humana: provavelQuestionario.sem_companhia_humana,
                sem_companhia_animal: provavelQuestionario.sem_companhia_animal,
                o_que_faz_em_viagem: provavelQuestionario.o_que_faz_em_viagem,
                o_que_faz_se_fugir: provavelQuestionario.o_que_faz_se_fugir,
                o_que_faz_se_nao_puder_criar: provavelQuestionario.o_que_faz_se_nao_puder_criar,
                animais_que_ja_criou: provavelQuestionario.animais_que_ja_criou,
                destino_animais_anteriores: provavelQuestionario.destino_animais_anteriores,
                costuma_esterilizar: provavelQuestionario.costuma_esterilizar,
                costuma_vacinar: provavelQuestionario.costuma_vacinar,
                costuma_vermifugar: provavelQuestionario.costuma_vermifugar,
                veterinario_usual: provavelQuestionario.veterinario_usual,
                forma_de_educar: provavelQuestionario.forma_de_educar,
                envia_fotos_e_videos_do_local: provavelQuestionario.envia_fotos_e_videos_do_local,
                aceita_visitas_e_fotos_do_animal: provavelQuestionario.aceita_visitas_e_fotos_do_animal,
                topa_entrar_grupo_adotantes: provavelQuestionario.topa_entrar_grupo_adotantes,
                concorda_com_taxa_adocao: provavelQuestionario.concorda_com_taxa_adocao,
                data_disponivel_para_buscar_animal: provavelQuestionario.data_disponivel_para_buscar_animal
            });

            //bro...
            //fds, eu vou adicionar pra algm formatar direito essa porra
            //no fim sobrou pra mim ainda, vtmnc
            res.status(201).json({            
                "empregado": novoQuestionario.empregado,
                "quantos animais possui": novoQuestionario.quantos_animais_possui,
                "motivos para adotar": novoQuestionario.motivos_para_adotar,
                "quem vai sustentar o animal": novoQuestionario.quem_vai_sustentar_o_animal,
                "numero adultos na casa": novoQuestionario.numero_adultos_na_casa,
                "numero criancas na casa": novoQuestionario.numero_criancas_na_casa,
                "idades criancas": novoQuestionario.idades_criancas,
                "residencia tipo": novoQuestionario.residencia_tipo,
                "proprietario permite animais":novoQuestionario.proprietario_permite_animais,
                "todos de acordo com adocao": novoQuestionario.todos_de_acordo_com_adocao,
                "responsavel pelo animal": novoQuestionario.responsavel_pelo_animal,
                "responsavel concorda com adocao": novoQuestionario.responsavel_concorda_com_adocao,
                "ha_alergico ou pessoas que nao gostam":novoQuestionario.ha_alergico_ou_pessoas_que_nao_gostam,
                "gasto mensal estimado":novoQuestionario.gasto_mensal_estimado,
                "valor disponivel no orcamento":novoQuestionario.valor_disponivel_no_orcamento,
                "tipo alimentacao": novoQuestionario.tipo_alimentacao,
                "local que o animal vai ficar":novoQuestionario.local_que_o_animal_vai_ficar,
                "forma de permanencia": novoQuestionario.forma_de_permanencia,
                "forma de confinamento": novoQuestionario.forma_de_confinamento,
                "tera brinquedos": novoQuestionario.tera_brinquedos,
                "tera abrigo": novoQuestionario.tera_abrigo,
                "tera passeios acompanhado": novoQuestionario.tera_passeios_acompanhado,
                "tera passeios sozinho": novoQuestionario.tera_passeios_sozinho,
                "companhia outro animal": novoQuestionario.companhia_outro_animal,
                "companhia humana 24h": novoQuestionario.companhia_humana_24h,
                "companhia humana parcial": novoQuestionario.companhia_humana_parcial,
                "sem companhia humana": novoQuestionario.sem_companhia_humana,
                "sem companhia animal": novoQuestionario.sem_companhia_animal,
                "o que faz em viagem":novoQuestionario.o_que_faz_em_viagem,
                "o que faz se fugir": novoQuestionario.o_que_faz_se_fugir,
                "o que faz se nao puder criar":novoQuestionario.o_que_faz_se_nao_puder_criar,
                "animais que ja criou": novoQuestionario.animais_que_ja_criou,
                "destino animais anteriores": novoQuestionario.destino_animais_anteriores,
                "costuma esterilizar": novoQuestionario.costuma_esterilizar,
                "costuma vacinar": novoQuestionario.costuma_vacinar,
                "costuma vermifugar": novoQuestionario.costuma_vermifugar,
                "veterinario usual":novoQuestionario.veterinario_usual,
                "forma de educar": novoQuestionario.forma_de_educar,
                "envia fotos e videos do local": novoQuestionario.envia_fotos_e_videos_do_local,
                "aceita visitas e fotos do animal":novoQuestionario.aceita_visitas_e_fotos_do_animal,
                "topa entrar grupo adotantes": novoQuestionario.topa_entrar_grupo_adotantes,
                "concorda com taxa adocao": novoQuestionario.concorda_com_taxa_adocao,
                "data disponivel para buscar animal": novoQuestionario.data_disponivel_para_buscar_animal
            });
        }

    }catch(error){
        //boa
        //essa caralha nem tava sendo pedida
        //sim, vadia, eu tirei essa resposta do meu cu
        res.status(500).json({"erro": "Erro interno ao responder o questionário"})
    };
};

export { postQuestionario }