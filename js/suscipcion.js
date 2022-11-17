let infoCuenta={
    nombre:"a",
    apellidos:"b",
    correo: "a@g.com",
    contraseña: "asdasd",
    movil: "666 666 666",
    observaciones:"",
    suscripcion:"intermedia",
}
let i=0;
document.cookie="contador";
function $(selector){
    return document.querySelector(selector);
}

function creaTicket(){
    let fila= document.createElement("tr");
    fila.setAttribute("id",`fila${i}`);
    $(".compra").appendChild(fila);
    let celda = document.createElement("td")
    celda.setAttribute("id",`celda${i}`);
    $(`#fila${i}`).appendChild(celda);
    $(`#celda${i}`).textContent=`${infoCuenta.suscripcion}`
}
creaTicket();