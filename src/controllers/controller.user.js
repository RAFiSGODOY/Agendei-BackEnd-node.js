
import serviceUser from "../services/service.user.js";

async function Login(req, res) {

    const { email, password } = req.body;

    const user = await serviceUser.Login(email, password);

    if (user.length == 0) {
        res.status(401).json({ error: "E-mail ou senha inválida" }); //não autorizado, status code de segurança
    } else {
        res.status(200).json(user);
    }


}


async function Inserir(req, res) {
    const { name, email, password } = req.body;

    // Verifica se o email já existe
    const existingUser = await serviceUser.VerificarEmail(email);
    
    if (existingUser){
        return res.status(401).json({error: "Email já está cadastrado." });
    }

    // Prossegue para inserir o novo usuário
    try {
        const user = await serviceUser.Inserir(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: "Erro ao cadastrar usuário." });
    }
}


async function Profile(req, res){

    const id_user = req.id_user;

    const user = await serviceUser.Profile(id_user);
    res.status(200).json(user);

}

export default { Profile, Inserir,  Login }