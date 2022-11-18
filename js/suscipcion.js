let infoCuenta={
    nombre:"a",
    apellidos:"b",
    correo: "a@g.com",
    contraseña: "asdasd",
    movil: "666 666 666",
    observaciones:"",
    suscripcion:"Intermedio",
}

function $(selector){
    return document.querySelector(selector);
}

function creaTicket(){
    let f=0;
    let c=0;
    let totalPagar=0.0;
    let fila= document.createElement("tr");
    fila.setAttribute("id",`fila${f}`);
    $(".compra").appendChild(fila);
    let celda = document.createElement("td")
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    $(`#celda${c}`).textContent=`${infoCuenta.suscripcion}`;
    c++;
    celda = document.createElement("td");
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    $(`#celda${c}`).textContent="x1";
    c++;
    celda = document.createElement("td");
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    switch (infoCuenta.suscripcion){
        case 'Basico':
            $(`#celda${c}`).textContent="00.00";
            totalPagar=totalPagar+00,00;
        break;
        case 'Iniciado':
            $(`#celda${c}`).textContent="30.00";
            totalPagar=totalPagar+30,00;
        break;
        case 'Intermedio':
            $(`#celda${c}`).textContent="50.00";
            totalPagar=totalPagar+50,00;
        break;
        case 'Experto':
            $(`#celda${c}`).textContent="90.00";
            totalPagar=totalPagar+90,00;
        break;
        case 'Sibarita':
            $(`#celda${c}`).textContent="120.00";
            totalPagar=totalPagar+120,00;
        break;
    }
    $(`.asteriscos`).textContent="***********************";
    f++;
    c++;
    fila= document.createElement("tr");
    fila.setAttribute("id",`fila${f}`);
    $(".total").appendChild(fila);
    celda = document.createElement("td");
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    $(`#celda${c}`).textContent="Total a pagar"
    c++;
    celda = document.createElement("td");
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    $(`#celda${c}`).textContent=""
    c++;
    celda = document.createElement("td");
    celda.setAttribute("id",`celda${c}`);
    $(`#fila${f}`).appendChild(celda);
    $(`#celda${c}`).textContent=`${totalPagar}`;
}
creaTicket();