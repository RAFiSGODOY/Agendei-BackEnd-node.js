import { query } from "../database/sqlite.js"; // Importa a função 'query' para interagir com o banco de dados SQLite

// Funções relacionadas a médicos

// Função para listar médicos, com opção de filtragem por nome
async function Listar(name) {
    let filtro = []; // Array para armazenar filtros da consulta

    // Define a consulta SQL inicial para selecionar todos os médicos
    let sql = 'select * from doctors ';

    // Se um nome for fornecido, adiciona um filtro para a consulta
    if(name){
       sql = sql + "where name like ? "; 
       filtro.push('%' + name + '%'); // Adiciona o filtro ao array, permitindo busca parcial
    }
    
    // Ordena os resultados pelo nome
    sql = sql + "order by name";

    // Executa a consulta com os filtros e retorna os médicos
    const doctors = await query(sql, filtro);
    return doctors;
}

// Função para inserir um novo médico no banco de dados
async function Inserir(name, specialty, icon) {
    // Define a consulta SQL para inserir um novo médico e retornar o id_doctor
    let sql = `insert into doctors(name, specialty, icon) values(?, ?, ?) 
    returning id_doctor`; 

    // Executa a consulta passando name, specialty e icon como parâmetros
    const doctor = await query(sql, [name, specialty, icon]);

    // Retorna o id_doctor do novo médico inserido
    return doctor[0];
}

// Função para editar os dados de um médico existente
async function Editar(id_doctor, name, specialty, icon) {
    // Define a consulta SQL para atualizar os dados do médico com base no id_doctor
    let sql = `update doctors set name=?, specialty=?, icon=? where id_doctor =?`; 

    // Executa a consulta passando os novos dados e o id_doctor como parâmetros
    await query(sql, [name, specialty, icon, id_doctor]);

    // Retorna o id_doctor do médico editado
    return { id_doctor };
}

// Função para excluir um médico do banco de dados
async function Excluir(id_doctor) {
    // Define a consulta SQL para deletar um médico com base no id_doctor
    let sql = `delete from doctors where id_doctor = ?`; 

    // Executa a consulta passando o id_doctor como parâmetro
    await query(sql, [id_doctor]);

    // Retorna o id_doctor do médico excluído
    return { id_doctor };
}

// Função para listar os serviços relacionados a um médico específico
async function ListarServicos(id_doctor) {
    // Define a consulta SQL para selecionar serviços associados ao médico
    let sql =  `select d.id_service, s.description, d.price from doctors_services d 
    join services s on (s.id_service = d.id_service)
    where d.id_doctor = ?
    order by s.description`;

    // Executa a consulta passando o id_doctor como parâmetro
    const serv = await query(sql, [id_doctor]);

    // Retorna a lista de serviços do médico
    return serv;
}

// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Editar, Excluir, ListarServicos };
