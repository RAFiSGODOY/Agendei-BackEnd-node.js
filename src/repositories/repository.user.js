import { query } from "../database/sqlite.js"; // Importa a função 'query' para interagir com o banco de dados SQLite

// Função para buscar um perfil de usuário pelo ID
async function Profile(id_user) {
    // Define a consulta SQL para selecionar id_user, name e email da tabela users com base no id_user
    let sql = 'select id_user, name, email from users where id_user = ? ';
    
    // Executa a consulta passando o id_user como parâmetro
    const user = await query(sql, [id_user]);
    
    // Retorna o primeiro usuário encontrado
    return user[0];
}

// Função para inserir um novo usuário no banco de dados
async function Inserir(name, email, password) {
    // Define a consulta SQL para inserir um novo usuário na tabela users e retornar o id_user
    let sql = `insert into users(name, email, password) values(?, ?, ?) returning id_user`; 

    // Executa a consulta passando name, email e password como parâmetros
    const user = await query(sql, [name, email, password]);
    
    // Retorna o id do novo usuário inserido
    return user[0];
}

// Função para verificar se existe algum usuário com o email fornecido
async function ListarByEmail(email) {
    // Define a consulta SQL para selecionar todos os dados do usuário com o email fornecido
    let sql = `select * from users where email = ?`; 

    // Executa a consulta passando o email como parâmetro
    const user = await query(sql, [email]);

    // Verifica se não encontrou nenhum usuário com o email
    if(user.length == 0){
        return []; // Retorna um array vazio se não houver usuário encontrado
    } else {
        return user[0]; // Retorna o primeiro usuário encontrado
    }
}

// Função para verificar se um email já está cadastrado
async function VerificarEmail(email) {
    // Define a consulta SQL para selecionar todos os usuários com o email fornecido
    let sql = `SELECT * FROM users WHERE email = ?`;
    
    // Executa a consulta passando o email como parâmetro
    const result = await query(sql, [email]);

    // Retorna verdadeiro se o usuário existir (ou seja, se houver registros), falso caso contrário
    return result.length > 0; // Se o resultado tiver algum registro, o email já está cadastrado
}

// Exporta as funções para uso em outros módulos
export default { Profile, Inserir, ListarByEmail, VerificarEmail };
