let campos={
    nombre:false,
    apellidos:false,
    correo: false,
    contraseña: false,
    movil: false,
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
        campos.correo=true;
    }
}
$('.movil').addEventListener('keyup',()=>{
    validar_movil()
})
function validar_movil(){
    var numtel = document.getElementById("movil").value;
    var MOVIL_REGEX= /^\d{9}|\d{3} \d{3} \d{3}|\d{3} \d{2} \d{2} \d{2}/;
    if(!numtel.match(MOVIL_REGEX)&&numtel.length){
        $("#movil").classList.remove("correcto");
        $("#movil").classList.add("incorrecto");
        $(".errorMovil").classList.add("active");
    }else{
        $("#movil").classList.remove("incorrecto");
        $(".errorMovil").classList.remove("active");
        $("#movil").classList.add("correcto");
        campos.movil=true;
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
        campos.nombre=true;
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
        campos.apellidos=true;
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
        campos.contraseña=true;
    }
}
$('#siguiente').addEventListener('click',(e)=>{
    //window.location.replace("../html/registro.html");
    e.preventDefault();
    if(campos.nombre && campos.apellidos && campos.correo && campos.contraseña && campos.movil){
        $(".formulario").classList.remove("active");
        $(".paquetes").classList.add("active");
    }
    
});
