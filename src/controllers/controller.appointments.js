
import serviceAppointments from "../services/service.appointments.js"


//Appointments Functions

async function ListarByUser(req, res){

    const id_user= req.id_user;

    const appointments = await serviceAppointments.Listar(id_user);
    res.status(200).json(appointments);


}
async function Inserir(req,res) {

    const id_user= req.id_user;
    const {id_doctor, id_service, booking_date, booking_hour} = req.body;

    const appointment = await serviceAppointments.Inserir(id_user,id_doctor,id_service,booking_date,booking_hour);

    res.status(201).json(appointment);
}





export default {ListarByUser, Inserir}