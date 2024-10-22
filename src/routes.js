import { Router } from "express"; // Importa o Router do Express para definir rotas
import controllerDoctor from "./controllers/controller.doctor.js"; // Importa o controlador de médicos
import controllerUser from "./controllers/controller.user.js"; // Importa o controlador de usuários
import controllerAppointments from "./controllers/controller.appointments.js"; // Importa o controlador de compromissos
import jwt from "./token.js"; // Importa o módulo para validação de tokens JWT
import repositoryAppointments from "./repositories/repository.appointments.js";

const router = Router(); // Cria uma instância do Router

// Rotas para médicos (Doctors)

// Rota para listar todos os médicos (GET)
router.get("/doctors", jwt.ValideToken, controllerDoctor.Listar);

// Rota para inserir um novo médico (POST)
router.post("/doctors", jwt.ValideToken, controllerDoctor.Inserir);

// Rota para editar os dados de um médico existente (PUT)
router.put("/doctors/:id_doctor", jwt.ValideToken, controllerDoctor.Editar);

// Rota para excluir um médico (DELETE)
router.delete("/doctors/:id_doctor", jwt.ValideToken, controllerDoctor.Excluir);

// Rota para listar os serviços de um médico específico (GET)
router.get("/doctors/:id_doctor/services", jwt.ValideToken, controllerDoctor.ListarServicos);

// Rotas para usuários (Users)

// Rota para registrar um novo usuário (POST)
router.post("/users/register", controllerUser.Inserir);

// Rota para realizar login de um usuário (POST)
router.post("/users/login", controllerUser.Login);

// Rota para obter o perfil do usuário (GET)
router.get("/users/profile", jwt.ValideToken, controllerUser.Profile);

// Rotas para compromissos (Appointments)

// Rota para listar compromissos de um usuário específico (GET)
router.get("/appointments", jwt.ValideToken, controllerAppointments.ListarByUser);

router.get("/appointments/check", jwt.ValideToken, repositoryAppointments.fetchAvailableHours);

router.get("/appointments/checkUserAppointments", jwt.ValideToken, controllerAppointments.checkUserAppointments);
// Rota para inserir um novo compromisso (POST)
router.post("/appointments", jwt.ValideToken, controllerAppointments.Inserir);

// Rota para excluir um compromisso existente (DELETE)
router.delete("/appointments/:id_appointment", jwt.ValideToken, controllerAppointments.Excluir);

// Exporta as rotas definidas para uso em outros módulos
export default router;
