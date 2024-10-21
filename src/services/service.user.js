import bcrypt from "bcrypt";
import repositoryUser from "../repositories/repository.user.js";
import jwt from "../token.js";

async function Profile(id_user) {
    const user = await repositoryUser.Profile(id_user);

    return user;
}



async function Inserir(name, email, password) {
    //Criptrografa a senha utilizando hash que faz um looping em 10 vezes 
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await repositoryUser.Inserir(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}
async function Login(email, password) {

    const user = await repositoryUser.ListarByEmail(email);

    if (user.length == 0) {
        return [];
    } else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            user.token= jwt.CreateToken(user.id_user)
            return user;
        } else {
            return [];
        }
    }

}

async function VerificarEmail(email) {
    const user = await repositoryUser.VerificarEmail(email);
    return user;
}




export default { Profile, Inserir, Login, VerificarEmail}