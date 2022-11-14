function $(selector){
    return document.querySelector(selector);
}

$('.correo').addEventListener('change',()=>{
    validar_correo();
})
function validar_correo(){
    var email = $("#email").value;
    var CORREO_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if( !email.match(CORREO_REGEX)){
        $("#email").classList.add("incorrecto");
        $(".errorCorreo").classList.add("active");
        $("#siguiente").disabled=true;
    }else{
        $("#email").classList.remove("incorrecto");
        $(".errorCorreo").classList.remove("active");
        $("#email").classList.add("correcto");
    }
}
$('.movil').addEventListener('change',()=>{
    validar_movil()
})
function validar_movil(){
    var numtel = document.getElementById("movil").value;
    var MOVIL_REGEX= /^\d{9}|\d{3} \d{3} \d{3}|\d{3} \d{2} \d{2} \d{2}/;
    if(!numtel.match(MOVIL_REGEX)){
        $("#movil").classList.add("incorrecto");
        $(".errorMovil").classList.add("active");
        $("#siguiente").disabled=true;
    }else{
        $("#movil").classList.remove("incorrecto");
        $(".errorMovil").classList.remove("active");
        $("#movil").classList.add("correcto");
        $("#siguiente").disabled=false;
    }
}
$('.nombre').addEventListener('change',()=>{
    
})
function validadNombre(){
    
}
$('#siguiente').addEventListener('click',()=>{
    //window.location.replace("../html/registro.html");
    window.open("../html/suscripcion.html");
});
