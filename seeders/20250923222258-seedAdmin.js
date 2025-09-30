'use strict';
//linha de código peak que n sei pra que serve mais veio junto do arquivo quando eu criei a seed
import encryptjs from "encryptjs";
import { connectDB, Usuario, sequelize } from "../src/models/Modelos.js"
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt"
//eu amo importar coisas que eu absolutamente NÃO USO no código
//peak pra caralho

//outra linha de código mega foda que eu n sei pra que serve mais ta aí pra algo
//ou não tbm, essa coisa tá comentada
/** @type {import('sequelize-cli').Migration} */

//npx sequelize-cli db:seed:all para rodar

const secreta = "teambluududjointoday!!!";

//cara, eu realmente gostaria de saber como eu usaria a porcaria da queryInterface, só que ela n identificava a tabela Usuario, ent eu tive que transformar ela em sequelize + sqlite tbm
//não me julga, isso é permitido de fazer em uma seed, só olhar exemplos na internet
export async function up(queryInterface, Sequelize) {
  const senhaHash = await bcrypt.hash("admin", 10);
  const senhaCriptografada = encryptjs.encrypt(senhaHash, secreta, 256);

  await Usuario.findOrCreate({ 
    where: { email: "c00lgui@admin.com"}, 
    defaults: {
        nome_completo: "007n7",
        email: "c00lgui@admin.com",
        senha: senhaCriptografada,
        cidade: "Robloxia",
        estado: "RB",
        idade: 500,
        telefone: "11999999999",
        cpf: "00011122233",
        endereco: "Work at a Pizza Place, 123",
        administrador: true
      }
    },
  );

  await Usuario.findOrCreate({ 
    where: { email: "builderman@admin.com"}, 
    defaults: {
        nome_completo: "David Baszucki",
        email: "builderman@admin.com",
        senha: senhaCriptografada,
        cidade: "Robloxia",
        estado: "RB",
        idade: 62,
        telefone: "11999999998",
        cpf: "11122233444",
        endereco: "Roblox HQ, 107",
        administrador: true
      }
    },
  );
}

// npx sequelize-cli db:seed:undo
export async function down(queryInterface, Sequelize) {
  const adminProcurado = await Usuario.findOne({ where: { email: "c00lgui@admin.com" }});
  if(adminProcurado){
    await adminProcurado.destroy();
  };

  const adminProcurado2 = await Usuario.findOne({ where: { email: "builderman@admin.com" }});
  if(adminProcurado2){
    await adminProcurado2.destroy();
  };
}

