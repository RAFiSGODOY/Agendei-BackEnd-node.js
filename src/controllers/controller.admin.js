import serviceAdmin from "../services/service.admin.js"; // Importa o serviço de usuário para gerenciar operações relacionadas a usuários

// Função para realizar o login do usuário
async function Login(req, res) {
    // Extrai email e senha do corpo da requisição
    const { email, password } = req.body;

    // Chama a função de login do serviço de usuário
    const admin = await serviceAdmin.Login(email, password);

    // Verifica se nenhum usuário foi encontrado
    if (admin.length == 0) {
        // Retorna um status 401 (não autorizado) e mensagem de erro se as credenciais forem inválidas
        res.status(401).json({ error: "E-mail ou senha inválida" });
    } else {
        // Retorna um status 200 e os dados do usuário se o login for bem-sucedido
        res.status(200).json(admin);
    }
}

// Função para cadastrar um novo usuário
async function Inserir(req, res) {
    // Extrai nome, email e senha do corpo da requisição
    const { name, email, password } = req.body;

    // Verifica se o email já está cadastrado
    const admin = await serviceAdmin.VerificarEmail(email);
    
    if (admin) {
        // Retorna um status 409 (conflito) e mensagem de erro se o email já estiver cadastrado
        return res.status(409).json({ error: "Email em uso por outro Admin" });
    }

    // Prossegue para inserir o novo usuário
    try {
        // Chama a função de inserção do serviço de usuário
        const admin = await serviceAdmin.Inserir(name, email, password);
        // Retorna um status 201 (criado) e os dados do novo usuário
        res.status(201).json(admin);
    } catch (error) {
        // Retorna um status 500 (erro interno) e mensagem de erro em caso de falha ao cadastrar
        res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
}

// Função para obter o perfil do usuário
async function Profile(req, res) {
    // Obtém o ID do usuário da requisição (presumivelmente, definido em um middleware anterior)
    const id_user = req.id_user;

    // Chama a função de perfil do serviço de usuário
    const admin = await serviceAdmin.Profile(id_user);
    // Retorna um status 200 e os dados do usuário
    res.status(200).json(admin);
}

// Exporta as funções para uso em outros módulos
export default { Profile, Inserir, Login };
