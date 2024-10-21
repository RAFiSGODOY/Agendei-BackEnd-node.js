import {Router} from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from  "./controllers/controller.user.js";
import controllerAppointments from "./controllers/controller.appointments.js";
import jwt from "./token.js";

const router = Router();

//Doctors
router.get("/doctors", jwt.ValideToken, controllerDoctor.Listar);

router.post("/doctors", jwt.ValideToken, controllerDoctor.Inserir);

router.put("/doctors/:id_doctor", jwt.ValideToken, controllerDoctor.Editar);

router.delete("/doctors/:id_doctor",  jwt.ValideToken, controllerDoctor.Excluir);

//DoctorsServices
router.get("/doctors/:id_doctor/services",  jwt.ValideToken, controllerDoctor.ListarServicos);

//Users 
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", jwt.ValideToken, controllerUser.Profile);


//Reservas User
router.get("/appointments", jwt.ValideToken, controllerAppointments.ListarByUser);
router.post("/appointments", jwt.ValideToken, controllerAppointments.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValideToken, controllerAppointments.Excluir);




export default router;