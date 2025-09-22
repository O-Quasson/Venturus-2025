'use strict';  
import { Usuario, connectDB } from "../src/models/Modelos.js"
import encryptjs from "encryptjs";

/** @type {import('sequelize-cli').Migration} */
export async function up (queryInterface, Sequelize) {

    connectDB();
    
    const senhaCriptografada = encryptjs.encrypt('admin', "euroubeiocodigodocastaway", 256);
    await queryInterface.bulkInsert(
      'Usuario',
      [
        {
          nome_completo: 'Administrador',
          email: 'admin@admin.com',
          senha: senhaCriptografada,
          administrador: true,
          cidade: 'Cidade Exemplo',
          estado: 'Estado Exemplo',
          idade: 30,
          telefone: '123456789',
          celular: '987654321',
          cpf: '12345678901',
          endereco: 'Rua Exemplo, 123',
          bairro: 'Bairro Exemplo',
          cep: '12345-678',
          instagram: '@exemplo',
          facebook: 'facebook.com/exemplo'
        },
      ],
      {}
    );
  }

export async function down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Usuario', {email: "admin@admin.com"}, {});
}

