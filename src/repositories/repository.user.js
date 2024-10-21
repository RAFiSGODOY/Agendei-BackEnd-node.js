import { query } from "../database/sqlite.js";

async function Profile(id_user) {

    let sql = 'select id_user, name, email from users where id_user = ? ';

    const user = await query(sql, [id_user]);

    return user[0];
}

async function Inserir(name, email, password) {

    let sql = `insert into users(name, email, password) values(?, ?, ?) 
    returning id_user`; 

    const user = await query(sql, [name, email, password]);

    return user[0];
}

//verificar se existe algum email igual com o passado para login
async function ListarByEmail(email) {

    let sql = `select * from users where email = ?`; 

    const user = await query(sql, [email]);

    if(user.length == 0){
        return [];
    } else {
      return user[0];  
    }

    
}

async function VerificarEmail(email) {
    let sql = `SELECT * FROM users WHERE email = ?`;
    const result = await query(sql, [email]);

    // Retorna verdadeiro se o usuário existir, falso caso contrário
    return result.length > 0; // Se o resultado tiver algum registro, o email já está cadastrado
}



export default { Profile , Inserir,  ListarByEmail, VerificarEmail}