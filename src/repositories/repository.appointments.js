import { query } from "../database/sqlite.js"; // Importa a função 'query' para interagir com o banco de dados SQLite

// Funções relacionadas a compromissos (appointments)

// Função para listar compromissos de um usuário específico
async function Listar(id_user) {
    // Define a consulta SQL para selecionar os compromissos do usuário, incluindo informações sobre serviços, médicos e usuários
    let sql = `select a.id_appointment, s.description as service, d.name as doctor, d.specialty, 
               a.booking_date, a.booking_hour, u.name as user, ds.price
               from appointments a 
               join services s on (s.id_service = a.id_service) 
               join doctors d on (d.id_doctor = a.id_doctor)
               join users u on (u.id_user = a.id_user)
               join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
               where a.id_user = ?
               order by a.booking_date, a.booking_hour`;

    // Executa a consulta passando o id_user como parâmetro e retorna os compromissos
    const appointments = await query(sql, [id_user]);
    return appointments;
}

// Função para inserir um novo compromisso
async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
    // Define a consulta SQL para inserir um novo compromisso e retornar o id_appointment
    let sql = `insert into appointments(id_user,id_doctor,id_service,booking_date,booking_hour) values(?, ?, ?, ?, ?) 
               returning id_appointment`; 

    // Executa a consulta passando os dados do compromisso como parâmetros
    const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

    // Retorna o id_appointment do novo compromisso inserido
    return appointment[0];
}

// Função para excluir um compromisso de um usuário
async function Excluir(id_user, id_appointment) {
    // Define a consulta SQL para deletar um compromisso específico com base no id_appointment e id_user
    let sql = `delete from appointments where id_appointment=? and id_user=?`; 

    // Executa a consulta passando o id_appointment e id_user como parâmetros
    const appointment = await query(sql, [id_appointment, id_user]);

    // Retorna o compromisso excluído (caso necessário)
    return appointment[0];
}

// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Excluir };
