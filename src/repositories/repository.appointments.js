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



async function Check(booking_date) {
    try {
        let sql = `
            SELECT booking_hour FROM appointments 
            WHERE booking_date = ? 
        `;

        const result = await query(sql, [booking_date]);

        // Extraindo apenas as horas reservadas
        const bookedHours = result.map(row => row.booking_hour);

        return bookedHours; // Retorna uma lista de horas já reservadas
    } catch (error) {
        console.error("Erro ao verificar horários:", error);
        throw new Error("Erro ao verificar horários."); // Propaga o erro
    }
}
async function fetchAvailableHours(req, res) {
    const booking_date = req.query.booking_date;

    try {
        const bookedHours = await Check(booking_date);

        // Todos os horários disponíveis (modifique conforme necessário)
        const allHours = [
            "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
            "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
            "17:00", "17:30", "18:00"
        ];

        // Filtra as horas disponíveis
        const availableHours = allHours.filter(hour => !bookedHours.includes(hour));

        res.status(200).json(availableHours); // Retorna apenas os horários livres
    } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
        res.status(500).json({ error: "Erro ao buscar horários disponíveis." });
    }
}


async function ListarByAdmin(dt_start,dt_end,id_doctor) {

    let filtro = [];

    // Define a consulta SQL para selecionar os compromissos do usuário, incluindo informações sobre serviços, médicos e usuários
    let sql = `select a.id_appointment, s.description as service, d.name as doctor, d.specialty, 
               a.booking_date, a.booking_hour, u.name as user, ds.price
               from appointments a 
               join services s on (s.id_service = a.id_service) 
               join doctors d on (d.id_doctor = a.id_doctor)
               join users u on (u.id_user = a.id_user)
               join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
               where a.id_appointment > 0 `;

               if(dt_start){
                 filtro.push(dt_start);
                 sql = sql + " and a.booking_date >= ? "
               }

               if(dt_end){
                filtro.push(dt_end);
                sql = sql + " and a.booking_date <= ? "
              }

              if(id_doctor){
                filtro.push(id_doctor);
                sql = sql + " and a.id_doctor = ? "
              }

              sql = sql + " order by a.booking_date, a.booking_hour";

    // Executa a consulta passando o id_user como parâmetro e retorna os compromissos
    const appointments = await query(sql, filtro);
    return appointments;
}






// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Excluir, fetchAvailableHours, Check, ListarByAdmin };
