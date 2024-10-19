
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

    const user = await serviceUser.Inserir(name, email, password);
    res.status(201).json(user);

}

async function Profile(req, res){

    const id_user = req.id_user;

    const user = await serviceUser.Profile(id_user);
    res.status(200).json(user);

}

export default { Profile, Inserir,  Login }