import serviceAppointments from "../services/service.appointments.js"; // Importa o serviço de compromissos para gerenciar operações relacionadas a compromissos

// Funções relacionadas a compromissos (appointments)

// Função para listar compromissos de um usuário específico
async function ListarByUser(req, res) {
    // Obtém o id_user a partir do objeto de requisição (presumivelmente definido por um middleware anterior)
    const id_user = req.id_user;

    // Chama a função de listar compromissos do serviço, passando o id_user como parâmetro
    const appointments = await serviceAppointments.Listar(id_user);
    
    // Retorna um status 200 e a lista de compromissos do usuário
    res.status(200).json(appointments);
}

// Função para inserir um novo compromisso
async function Inserir(req, res) {
    // Obtém o id_user a partir do objeto de requisição
    const id_user = req.id_user;

    // Extrai os dados do compromisso do corpo da requisição
    const { id_doctor, id_service, booking_date, booking_hour } = req.body;

    // Chama a função de inserção do serviço de compromissos, passando os dados necessários
    const appointment = await serviceAppointments.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);
    
    // Retorna um status 201 (criado) e os dados do novo compromisso
    res.status(201).json(appointment);
}

// Função para excluir um compromisso existente
async function Excluir(req, res) {
    // Obtém o id_user a partir do objeto de requisição
    const id_user = req.id_user;

    // Obtém o id_appointment a partir dos parâmetros da requisição
    const id_appointment = req.params.id_appointment;

    // Chama a função de exclusão do serviço de compromissos, passando o id_user e o id_appointment
    const appointment = await serviceAppointments.Excluir(id_user, id_appointment);
    
    // Retorna um status 200 e os dados do compromisso excluído
    res.status(200).json(appointment);
}

// Exporta as funções para uso em outros módulos
export default { ListarByUser, Inserir, Excluir };
