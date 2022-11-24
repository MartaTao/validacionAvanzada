let infoCuenta={
    nombre:"",
    apellidos:"",
    correo: "",
    contraseña: "",
    movil: "",
    observaciones:"",
    suscripcion:"",
    metodoPago:{
        numTarjtea:"",
        mesExp:"",
        anioExp:"",
        numCVV:"",
    }
}
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
        let totalCorreos=parseInt(sessionStorage.getItem("numCuentas"));
        let i=0;
        let correoExiste=false;
        for(;i<totalCorreos;i++ ){
            info = JSON.parse(sessionStorage.getItem(`cuenta${i}`));
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
    $(".recibo").classList.add("active");
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
}
$('.tarjeta').addEventListener('keyup',()=>{
    validar_numTarjeta()
})
function validar_numTarjeta(){
    const TARJETA_REGEX=/^(\d\s?){15,16}$/;
    const numTarjtea=$('.tarjeta').value;
    if(!numTarjtea.match(TARJETA_REGEX)){
        $(".tarjeta").classList.remove("correcto");
        $(".tarjeta").classList.add("incorrecto");
        $(".errorTarjeta").classList.add("active");
    }else{
        $(".tarjeta").classList.remove("incorrecto");
        $(".errorTarjeta").classList.remove("active");
        $(".tarjeta").classList.add("correcto");
        infoCuenta.metodoPago.numTarjtea=numTarjtea;
    }
}
$('#mes').addEventListener('keyup',()=>{
    validar_mes()
})
function validar_mes(){
    const MES_REGEX=/^[+]?(0?[1-9]|1[0-2])$/;
    const mes=$('#mes').value;
    if(!mes.match(MES_REGEX)){
        $("#mes").classList.remove("correcto");
        $("#mes").classList.add("incorrecto");
        $(".errorMes").classList.add("active");
    }else{
        $("#mes").classList.remove("incorrecto");
        $(".errorMes").classList.remove("active");
        $("#mes").classList.add("correcto");
        infoCuenta.metodoPago.mesExp=mes;
    }
}
$('#anio').addEventListener('keyup',()=>{
    validar_anio()
})
function validar_anio(){
    const ANIO_REGEX=/^([0-9]{2})$/;
    const anio=$('#anio').value;
    if(!anio.match(ANIO_REGEX)){
        $("#anio").classList.remove("correcto");
        $("#anio").classList.add("incorrecto");
        $(".errorAnio").classList.add("active");
    }else{
        $("#anio").classList.remove("incorrecto");
        $(".errorAnio").classList.remove("active");
        $("#anio").classList.add("correcto");
        infoCuenta.metodoPago.anioExp=anio;
    }
}
$('.cvv').addEventListener('keyup',()=>{
    validar_cvv();
})
function validar_cvv(){
    const CVV_REGEX=/^[0-9]{3,4}$/;
    const numCVV=$('.cvv').value;
    if(!numCVV.match(CVV_REGEX)){
        $(".cvv").classList.remove("correcto");
        $(".cvv").classList.add("incorrecto");
        $(".errorCVV").classList.add("active");
    }else{
        $(".cvv").classList.remove("incorrecto");
        $(".errorCVV").classList.remove("active");
        $(".cvv").classList.add("correcto");
        infoCuenta.metodoPago.numCVV=numCVV;
    }
}
$("#aceptar").addEventListener('click',()=>{
    if(infoCuenta.metodoPago.numTarjtea!=""&&infoCuenta.metodoPago.mesExp!=""&&infoCuenta.metodoPago.anioExp!=""&&infoCuenta.metodoPago.numCVV!=""){
        $(".recibo").classList.remove("active");
        $('.agradecimiento').classList.add("active");
        if(sessionStorage.getItem("numCuentas")==null){
            contadorCuenta=0;
        }else{
            contadorCuenta=sessionStorage.getItem("numCuentas")
        }
        sessionStorage.setItem(`cuenta${contadorCuenta}`,JSON.stringify(infoCuenta));
        contadorCuenta++;
        sessionStorage.setItem("numCuentas",`${contadorCuenta}`);
    } 
})
$("#inicio").addEventListener('click',()=>{
    location.href="../index.html"
})