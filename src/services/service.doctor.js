import repositoryDoctor from "../repositories/repository.doctor.js"; // Importa o repositório de médicos para interagir com o banco de dados

// Funções relacionadas a médicos

// Função para listar médicos, com opção de filtragem pelo nome
async function Listar(name) {
    // Chama a função de listar do repositório de médicos, passando o nome como parâmetro
    const doctors = await repositoryDoctor.Listar(name);

    // Retorna a lista de médicos
    return doctors;
}

// Função para inserir um novo médico
async function Inserir(name, specialty, icon) {
    // Chama a função de inserção do repositório de médicos, passando os dados do médico
    const doctor = await repositoryDoctor.Inserir(name, specialty, icon);

    // Retorna os dados do novo médico inserido
    return doctor;
}

// Função para editar os dados de um médico existente
async function Editar(id_doctor, name, specialty, icon) {
    // Chama a função de edição do repositório de médicos, passando o id_doctor e os novos dados
    const doctor = await repositoryDoctor.Editar(id_doctor, name, specialty, icon);
    
    // Retorna os dados do médico editado
    return doctor;
}

// Função para excluir um médico do banco de dados
async function Excluir(id_doctor) {
    // Chama a função de exclusão do repositório de médicos, passando o id_doctor
    const doctor = await repositoryDoctor.Excluir(id_doctor);
    
    // Retorna o id_doctor do médico excluído
    return doctor;
}

// Função para listar os serviços associados a um médico específico
async function ListarServicos(id_doctor) {
    // Chama a função de listar serviços do repositório de médicos, passando o id_doctor
    const serv = await repositoryDoctor.ListarServicos(id_doctor);
    
    // Retorna a lista de serviços do médico
    return serv;
}

// Exporta as funções para uso em outros módulos
export default { Listar, Inserir, Editar, Excluir, ListarServicos };
