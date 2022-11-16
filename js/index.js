function $(selector){
    return document.querySelector(selector);
}
$('#iniciaSesion').addEventListener('click',()=>{
    //window.location.replace("../html/registro.html");
    //window.open("../html/registro.html");
    const correo=$("#correo").value;
    const pass=$("#password").value;
    let info = JSON.parse(localStorage.getItem("cuenta3"))
    if(correo==info.correo){
        if(pass!=info.contraseña){
            $(".errSesion").classList.add("active");
            $(".cuentaNoExist").classList.remove("active");
        }else{
            //location.href="../html/sesionIniciada.html";
            console.log("Sesion inicada :3");
        }
    }else{
        if(correo!=""){
            $(".errSesion").classList.remove("active");
            $(".cuentaNoExist").classList.add("active");
        }
    }
    
});