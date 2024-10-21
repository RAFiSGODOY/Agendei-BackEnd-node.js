import express from "express"; // Importa o framework Express para criar a aplicação
import cors from "cors"; // Importa o middleware CORS para permitir requisições de diferentes origens
import router from "./routes.js"; // Importa as rotas definidas no arquivo routes.js

const app = express(); // Cria uma instância da aplicação Express

// Middleware para analisar requisições JSON
app.use(express.json());
// Middleware CORS para permitir que o servidor aceite requisições de diferentes origens
app.use(cors());
// Define as rotas da aplicação
app.use(router);

// Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log("Servidor rodando na porta : 3001"); // Exibe uma mensagem no console quando o servidor está em execução
});
