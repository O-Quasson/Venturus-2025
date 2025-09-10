import { Questionario, Usuario } from "../models/Modelos.js";

const postQuestionario = async (req, res) => {
    try{ 
        const novoQuestionario = ({
            usuarioId: req.body.usuarioId,
            empregado: req.body.empregado,
            quantos_animais_possui: req.body.quantos_animais_possui,
            motivos_para_adotar: req.body.motivos_para_adotar,
            quem_vai_sustentar_o_animal: req.body.quem_vai_sustentar_o_animal,
            numero_adultos_na_casa: req.body.numero_adultos_na_casa,
            numero_criancas_na_casa: req.body.numero_criancas_na_casa,
            idades_criancas: req.body.idades_criancas,
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
        const usuarioExistente = await Usuario.findByPk(novoQuestionario.usuarioId);

        //bro, como que faz isso não ser um if gigante? pq essa porra definitivamente não vai funcionar
        // sla mn vai na fé
        if((Object.keys(novoQuestionario)==null)||(!usuarioExistente)||(Object.keys(novoQuestionario==undefined))){
            res.status(400)({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
        }else{

            const novoQuestionario = await Questionario.create({
                usuarioId: novoQuestionario.usuarioId,
                empregado: novoQuestionario.empregado,
                quantos_animais_possui: novoQuestionario.quantos_animais_possui,
                motivos_para_adotar: novoQuestionario.motivos_para_adotar,
                quem_vai_sustentar_o_animal: novoQuestionario.quem_vai_sustentar_o_animal,
                numero_adultos_na_casa: novoQuestionario.numero_adultos_na_casa,
                numero_criancas_na_casa: novoQuestionario.numero_criancas_na_casa,
                idades_criancas: novoQuestionario.idades_criancas,
                residencia_tipo: novoQuestionario.residencia_tipo,
                proprietario_permite_animais: novoQuestionario.proprietario_permite_animais,
                todos_de_acordo_com_adocao: novoQuestionario.todos_de_acordo_com_adocao,
                responsavel_pelo_animal: novoQuestionario.responsavel_pelo_animal,
                responsavel_concorda_com_adocao: novoQuestionario.responsavel_concorda_com_adocao,
                ha_alergico_ou_pessoas_que_nao_gostam: novoQuestionario.ha_alergico_ou_pessoas_que_nao_gostam,
                gasto_mensal_estimado: novoQuestionario.gasto_mensal_estimado,
                valor_disponivel_no_orcamento: novoQuestionario.valor_disponivel_no_orcamento,
                tipo_alimentacao: novoQuestionario.tipo_alimentacao,
                local_que_o_animal_vai_ficar: novoQuestionario.local_que_o_animal_vai_ficar,
                forma_de_permanencia: novoQuestionario.forma_de_permanencia,
                forma_de_confinamento: novoQuestionario.forma_de_confinamento,
                tera_brinquedos: novoQuestionario.tera_brinquedos,
                tera_abrigo: novoQuestionario.tera_abrigo,
                tera_passeios_acompanhado: novoQuestionario.tera_passeios_acompanhado,
                tera_passeios_sozinho: novoQuestionario.tera_passeios_sozinho,
                companhia_outro_animal: novoQuestionario.companhia_outro_animal,
                companhia_humana_24h: novoQuestionario.companhia_humana_24h,
                companhia_humana_parcial: novoQuestionario.companhia_humana_parcial,
                sem_companhia_humana: novoQuestionario.sem_companhia_humana,
                sem_companhia_animal: novoQuestionario.sem_companhia_animal,
                o_que_faz_em_viagem: novoQuestionario.o_que_faz_em_viagem,
                o_que_faz_se_fugir: novoQuestionario.o_que_faz_se_fugir,
                o_que_faz_se_nao_puder_criar: novoQuestionario.o_que_faz_se_nao_puder_criar,
                animais_que_ja_criou: novoQuestionario.animais_que_ja_criou,
                destino_animais_anteriores: novoQuestionario.destino_animais_anteriores,
                costuma_esterilizar: novoQuestionario.costuma_esterilizar,
                costuma_vacinar: novoQuestionario.costuma_vacinar,
                costuma_vermifugar: novoQuestionario.costuma_vermifugar,
                veterinario_usual: novoQuestionario.veterinario_usual,
                forma_de_educar: novoQuestionario.forma_de_educar,
                envia_fotos_e_videos_do_local: novoQuestionario.envia_fotos_e_videos_do_local,
                aceita_visitas_e_fotos_do_animal: novoQuestionario.aceita_visitas_e_fotos_do_animal,
                topa_entrar_grupo_adotantes: novoQuestionario.topa_entrar_grupo_adotantes,
                concorda_com_taxa_adocao: novoQuestionario.concorda_com_taxa_adocao,
                data_disponivel_para_buscar_animal: novoQuestionario.data_disponivel_para_buscar_animal
            });

            res.status(201).json({            
                "empregado": novoQuestionario.empregado,
                "quantos_animais_possui": novoQuestionario.quantos_animais_possui,
                "motivos_para_adotar": novoQuestionario.motivos_para_adotar,
                "quem_vai_sustentar_o_animal": novoQuestionario.quem_vai_sustentar_o_animal,
                "numero_adultos_na_casa": novoQuestionario.numero_adultos_na_casa,
                "numero_criancas_na_casa": novoQuestionario.numero_criancas_na_casa,
                "idades_criancas": novoQuestionario.idades_criancas,
                "residencia_tipo": novoQuestionario.residencia_tipo,
                "proprietario_permite_animais":novoQuestionario.proprietario_permite_animais,
                "todos_de_acordo_com_adocao": novoQuestionario.todos_de_acordo_com_adocao,
                "responsavel_pelo_animal": novoQuestionario.responsavel_pelo_animal,
                "responsavel_concorda_com_adocao": novoQuestionario.responsavel_concorda_com_adocao,
                "ha_alergico_ou_pessoas_que_nao_gostam":novoQuestionario.ha_alergico_ou_pessoas_que_nao_gostam,
                "gasto_mensal_estimado":novoQuestionario.gasto_mensal_estimado,
                "valor_disponivel_no_orcamento":novoQuestionario.valor_disponivel_no_orcamento,
                "tipo_alimentacao": novoQuestionario.tipo_alimentacao,
                "local_que_o_animal_vai_ficar":novoQuestionario.local_que_o_animal_vai_ficar,
                "forma_de_permanencia": novoQuestionario.forma_de_permanencia,
                "forma_de_confinamento": novoQuestionario.forma_de_confinamento,
                "tera_brinquedos": novoQuestionario.tera_brinquedos,
                "tera_abrigo": novoQuestionario.tera_abrigo,
                "tera_passeios_acompanhado": novoQuestionario.tera_passeios_acompanhado,
                "tera_passeios_sozinho": novoQuestionario.tera_passeios_sozinho,
                "companhia_outro_animal": novoQuestionario.companhia_outro_animal,
                "companhia_humana_24h": novoQuestionario.companhia_humana_24h,
                "companhia_humana_parcial": novoQuestionario.companhia_humana_parcial,
                "sem_companhia_humana": novoQuestionario.sem_companhia_humana,
                "sem_companhia_animal": novoQuestionario.sem_companhia_animal,
                "o_que_faz_em_viagem":novoQuestionario.o_que_faz_em_viagem,
                "o_que_faz_se_fugir": novoQuestionario.o_que_faz_se_fugir,
                "o_que_faz_se_nao_puder_criar":novoQuestionario.o_que_faz_se_nao_puder_criar,
                "animais_que_ja_criou": novoQuestionario.animais_que_ja_criou,
                "destino_animais_anteriores": novoQuestionario.destino_animais_anteriores,
                "costuma_esterilizar": novoQuestionario.costuma_esterilizar,
                "costuma_vacinar": novoQuestionario.costuma_vacinar,
                "costuma_vermifugar": novoQuestionario.costuma_vermifugar,
                "veterinario_usual":novoQuestionario.veterinario_usual,
                "forma_de_educar": novoQuestionario.forma_de_educar,
                "envia_fotos_e_videos_do_local": novoQuestionario.envia_fotos_e_videos_do_local,
                "aceita_visitas_e_fotos_do_animal":novoQuestionario.aceita_visitas_e_fotos_do_animal,
                "topa_entrar_grupo_adotantes": novoQuestionario.topa_entrar_grupo_adotantes,
                "concorda_com_taxa_adocao": novoQuestionario.concorda_com_taxa_adocao,
                "data_disponivel_para_buscar_animal": novoQuestionario.data_disponivel_para_buscar_animal
            });
        }

    }catch(error){
        res.status(500).json({"erro": "Erro interno ao responder o questionário"})
    };
};

export { postQuestionario }