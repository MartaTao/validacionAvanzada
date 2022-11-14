let campos={
    nombre:false,
    apellidos:false,
    correo: false,
    contraseña: false,
    movil: false,
    comunidad: false,
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
        $(".errorCorreo").classList.add("active");
    }else{
        $("#email").classList.remove("incorrecto");
        $(".errorCorreo").classList.remove("active");
        $("#email").classList.add("correcto");
        correo=true;
    }
}
$('.movil').addEventListener('keyup',()=>{
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
        movil=true;
    }
}
$('.nombre').addEventListener('keyup',()=>{
    validar_nombre()
})
function validar_nombre(){
    let NOMBRE_REGEX=/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let nombre=$(".nombre").value;
    if(!nombre.match(NOMBRE_REGEX)){
        console.log("eso no es uan letra");
    }else{
        nombre=true;
    }
}
$('#siguiente').addEventListener('click',(e)=>{
    //window.location.replace("../html/registro.html");
    e.preventDefault();
    if(campos.nombre && campos.apellidos && campos.correo && campos.contraseña && campos.movil && campos.comunidad){
        window.open("../html/suscripcion.html");
    }
    
});
