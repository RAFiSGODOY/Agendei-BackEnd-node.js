import jwt from "jsonwebtoken"; // Importa o módulo jsonwebtoken para manipulação de tokens JWT

const secretToken = "jornadaJS123"; // Define uma chave secreta para assinatura dos tokens

// Função para criar um token JWT
function CreateToken(id_user) {
    // Cria um token, incluindo o id_user como payload e definindo a expiração
    const token = jwt.sign({ id_user }, secretToken, {
        expiresIn: 9999999 // Define o tempo de expiração do token (em segundos)
    });

    // Retorna o token gerado
    return token;
}

// Função para validar um token JWT
function ValideToken(req, res, next) {
    // Obtém o token do cabeçalho de autorização da requisição
    const authToken = req.headers.authorization;

    // Verifica se o token foi informado
    if (!authToken) {
        return res.status(401).json({ error: "Token não informado" }); // Retorna erro 401 se o token não estiver presente
    }

    // Separa o tipo de autorização e o token
    const [bearer, token] = authToken.split(" ");

    // Verifica o token usando a chave secreta
    jwt.verify(token, secretToken, (err, tokenDecoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" }); // Retorna erro 401 se o token for inválido
        }

        // Se o token for válido, adiciona o id_user ao objeto de requisição para uso posterior
        req.id_user = tokenDecoded.id_user;

        // Chama o próximo middleware na cadeia
        next();
    });
}

// Exporta as funções para uso em outros módulos
export default { CreateToken, ValideToken };
