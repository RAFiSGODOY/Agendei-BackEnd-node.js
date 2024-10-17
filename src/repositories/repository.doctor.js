

async function Listar() {





    //Simulação ao acesso ao banco
    const doctors = [
        { id: 1, name: "Heber", specialty: "Cardiologista", icon: "M" },
        { id: 1, name: "Joao", specialty: "Cardiologista", icon: "M" },
        { id: 1, name: "Maria", specialty: "Cardiologista", icon: "F" }
    ];



    return doctors;
}

export default { Listar }