import repositoryAppointments from "../repositories/repository.appointments.js"; // Importa o repositório de compromissos para interagir com o banco de dados

// Funções relacionadas a compromissos (appointments)

// Função para listar compromissos de um usuário específico
async function Listar(id_user) {
    // Chama a função de listar do repositório de compromissos, passando o id_user como parâmetro
    const appointments = await repositoryAppointments.Listar(id_user);

    // Retorna a lista de compromissos
    return appointments;
}

// Função para inserir um novo compromisso
async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
    // Chama a função de inserção do repositório de compromissos, passando os dados necessários
    const appointment = await repositoryAppointments.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);

    // Retorna os dados do novo compromisso inserido
    return appointment;
}

// Função para excluir um compromisso existente
async function Excluir(id_user, id_appointment) {
    // Chama a função de exclusão do repositório de compromissos, passando o id_user e o id_appointment
    const appointment = await repositoryAppointments.Excluir(id_user, id_appointment);

    // Retorna os dados do compromisso excluído
    return appointment;
}

async function Check(booking_date) {
  
        const result = await repositoryAppointments.Check(booking_date); 
        return result; 
    
}


// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Excluir, Check};
