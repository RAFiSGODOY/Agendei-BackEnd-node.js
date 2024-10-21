import serviceDoctor from "../services/service.doctor.js"; // Importa o serviço de médicos para gerenciar operações relacionadas a médicos

// Funções relacionadas a médicos

// Função para listar médicos, possivelmente filtrando pelo nome
async function Listar(req, res) {
    // Obtém o nome a partir da query string da requisição
    const name = req.query.name;

    // Chama a função de listar do serviço de médicos, passando o nome como filtro
    const doctors = await serviceDoctor.Listar(name);
    
    // Retorna um status 200 e a lista de médicos
    res.status(200).json(doctors);
}

// Função para inserir um novo médico
async function Inserir(req, res) {
    // Extrai nome, especialidade e ícone do corpo da requisição
    const { name, specialty, icon } = req.body;

    // Chama a função de inserção do serviço de médicos
    const doctor = await serviceDoctor.Inserir(name, specialty, icon);
    
    // Retorna um status 201 (criado) e os dados do novo médico
    res.status(201).json(doctor);
}

// Função para editar os dados de um médico existente
async function Editar(req, res) {
    // Obtém o id_doctor a partir dos parâmetros da requisição
    const id_doctor = req.params.id_doctor;
    
    // Extrai nome, especialidade e ícone do corpo da requisição
    const { name, specialty, icon } = req.body;

    // Chama a função de edição do serviço de médicos
    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);
    
    // Retorna um status 200 e os dados do médico editado
    res.status(200).json(doctor);
}

// Função para excluir um médico do banco de dados
async function Excluir(req, res) {
    // Obtém o id_doctor a partir dos parâmetros da requisição
    const id_doctor = req.params.id_doctor;

    // Chama a função de exclusão do serviço de médicos
    const doctor = await serviceDoctor.Excluir(id_doctor);
    
    // Retorna um status 200 e o id_doctor do médico excluído
    res.status(200).json(doctor);
}

// Função para listar os serviços de um médico específico
async function ListarServicos(req, res) {
    // Obtém o id_doctor a partir dos parâmetros da requisição
    const id_doctor = req.params.id_doctor;

    // Chama a função de listar serviços do serviço de médicos
    const serv = await serviceDoctor.ListarServicos(id_doctor);
    
    // Retorna um status 200 e a lista de serviços do médico
    res.status(200).json(serv);
}

// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Editar, Excluir, ListarServicos };
