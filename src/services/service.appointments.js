
import repositoryAppointments from "../repositories/repository.appointments.js";

async function Listar(id_user){

    const appointments = await repositoryAppointments.Listar(id_user);

    return appointments;


}

async function Inserir(id_user,id_doctor,id_service,booking_date,booking_hour) {
    const appointment = await repositoryAppointments.Inserir(id_user,id_doctor,id_service,booking_date,booking_hour);

    return appointment;
}
async function Excluir(id_user, id_appointment) {
   
    const  appointment = await repositoryAppointments.Excluir(id_user, id_appointment);

    return appointment;
}

export default { Listar, Inserir, Excluir}