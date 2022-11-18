let infoCuenta={
    nombre:"",
    apellidos:"",
    correo: "",
    contraseña: "",
    movil: "",
    observaciones:"",
    suscripcion:"",
}
document.cookie="contador";
function $(selector){
    return document.querySelector(selector);
}

$('.correo').addEventListener('keyup',()=>{
    validar_correo();
})
function validar_correo(){
    var email = $("#email").value;
    var CORREO_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if( !email.match(CORREO_REGEX)){
        $("#email").classList.remove("correcto");
        $("#email").classList.add("incorrecto");
        $(".errorCorreo").textContent="El correo introducido no es válido"
        $(".errorCorreo").classList.add("active");
    }else{;
        let totalCorreos=parseInt(localStorage.getItem("numCuentas"));
        let i=0;
        let correoExiste=false;
        for(;i<totalCorreos;i++ ){
            info = JSON.parse(localStorage.getItem(`cuenta${i}`));
            if(email==info.correo){
                correoExiste=true;
            }
        }
        if(!correoExiste){
            $("#email").classList.remove("incorrecto");
            $(".errorCorreo").classList.remove("active");
            $("#email").classList.add("correcto");
            infoCuenta.correo=email;
        }else{
            $("#email").classList.remove("correcto");
            $(".errorCorreo").textContent="El correo introducido ya existe"
            $(".errorCorreo").classList.add("active");
            $("#email").classList.add("incorrecto");
        }
    }
}
$('#movil').addEventListener('keyup',()=>{
    validar_movil()
})
function validar_movil(){
    var numtel = document.getElementById("movil").value;
    var MOVIL_REGEX= /^\d{9}|\d{3} \d{3} \d{3}|\d{3} \d{2} \d{2} \d{2}/;
    if(!numtel.match(MOVIL_REGEX)){
        $("#movil").classList.remove("correcto");
        $("#movil").classList.add("incorrecto");
        $(".errorMovil").classList.add("active");
    }else{
        $("#movil").classList.remove("incorrecto");
        $(".errorMovil").classList.remove("active");
        $("#movil").classList.add("correcto");
        infoCuenta.movil=numtel;
    }
}
$('.nombre').addEventListener('keyup',()=>{
    validar_nombre()
})
function validar_nombre(){
    let NOMBRE_REGEX=/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let nombre=$(".nombre").value;
    if(!nombre.match(NOMBRE_REGEX)){
        $(".nombre").classList.remove("correcto");
        $(".nombre").classList.add("incorrecto");
        $(".errorNombre").classList.add("active");
    }else{
        $(".nombre").classList.remove("incorrecto");
        $(".errorNombre").classList.remove("active");
        $(".nombre").classList.add("correcto");
        infoCuenta.nombre=nombre;
    }
}
$('.apellidos').addEventListener('keyup',()=>{
    validar_apellidos()
})
function validar_apellidos(){
    let APELLIDOS_REGEX=/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let apellidos=$(".apellidos").value;
    if(!apellidos.match(APELLIDOS_REGEX)){
        $(".apellidos").classList.remove("correcto");
        $(".apellidos").classList.add("incorrecto");
        $(".errorApellidos").classList.add("active");
    }else{
        $(".apellidos").classList.remove("incorrecto");
        $(".errorApellidos").classList.remove("active");
        $(".apellidos").classList.add("correcto");
        infoCuenta.apellidos=apellidos;
    }
}
$('.password').addEventListener('keyup',()=>{
    validar_password()
})
function validar_password(){
    let PASSWORD_REGEX= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    let password=$(".password").value;
    if(!password.match(PASSWORD_REGEX)){
        $(".password").classList.remove("correcto");
        $(".password").classList.add("incorrecto");
        $(".errorCon").classList.add("active");
    }else{
        $(".password").classList.remove("incorrecto");
        $(".errorCon").classList.remove("active");
        $(".password").classList.add("correcto");
        infoCuenta.contraseña=password;
    }
}
$('#siguiente').addEventListener('click',()=>{
    if(infoCuenta.nombre !="" && infoCuenta.apellidos!="" && infoCuenta.correo!="" && infoCuenta.contraseña!="" && infoCuenta.movil!=""){
        $(".formulario").classList.remove("active");
        $(".paquetes").classList.add("active");
        elijePaquete();
    }
});
function elijePaquete(){
    let paquetes = document.getElementsByClassName("comprar");
    let i=0;
    for(;i<paquetes.length;i++){
        paquetes[i].addEventListener('click',function(){
            infoCuenta.suscripcion=this.id;
            creaTicket();
        })
    }
    
}
function creaTicket(){
    $(".paquetes").classList.remove("active");
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
    $(".pago").classList.add("active");
    $(".ticket").classList.add("active");
    /*$(".siguiente").addEventListener('click',()=>{
        if(localStorage.getItem("numCuentas")==null){
            contadorCuenta=0;
        }else{
            contadorCuenta=localStorage.getItem("numCuentas")
        }
        localStorage.setItem(`cuenta${contadorCuenta}`,JSON.stringify(infoCuenta));
        contadorCuenta++;
        localStorage.setItem("numCuentas",`${contadorCuenta}`);
    })*/
}


