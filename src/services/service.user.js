import bcrypt from "bcrypt"; // Importa o módulo bcrypt para criptografia de senhas
import repositoryUser from "../repositories/repository.user.js"; // Importa o repositório de usuários para interagir com o banco de dados
import jwt from "../token.js"; // Importa o módulo para criação de tokens JWT

// Função para obter o perfil do usuário
async function Profile(id_user) {
    // Chama a função de perfil do repositório de usuários, passando o id_user
    const user = await repositoryUser.Profile(id_user);

    // Retorna os dados do usuário
    return user;
}

// Função para inserir um novo usuário
async function Inserir(name, email, password) {
    // Criptografa a senha utilizando hash, fazendo 10 iterações
    const hashPassword = await bcrypt.hash(password, 10);

    // Chama a função de inserção do repositório de usuários, passando os dados do novo usuário
    const user = await repositoryUser.Inserir(name, email, hashPassword);

    // Cria um token JWT para o usuário e o adiciona ao objeto user
    user.token = jwt.CreateToken(user.id_user);

    // Retorna os dados do novo usuário com o token
    return user;
}

// Função para realizar o login de um usuário
async function Login(email, password) {
    // Chama a função de listar usuários pelo email
    const user = await repositoryUser.ListarByEmail(email);

    // Verifica se o usuário existe
    if (user.length == 0) {
        return []; // Retorna um array vazio se o usuário não for encontrado
    } else {
        // Compara a senha fornecida com a senha armazenada (criptografada)
        if (await bcrypt.compare(password, user.password)) {
            delete user.password; // Remove a senha do objeto user antes de retornar
            user.token = jwt.CreateToken(user.id_user); // Cria um token JWT para o usuário
            return user; // Retorna os dados do usuário com o token
        } else {
            return []; // Retorna um array vazio se a senha estiver incorreta
        }
    }
}

// Função para verificar se o email já está cadastrado
async function VerificarEmail(email) {
    // Chama a função de verificação de email do repositório de usuários
    const user = await repositoryUser.VerificarEmail(email);
    return user; // Retorna o resultado da verificação
}

// Exporta as funções para uso em outros módulos
export default { Profile, Inserir, Login, VerificarEmail };
