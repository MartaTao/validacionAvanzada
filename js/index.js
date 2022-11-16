function $(selector){
    return document.querySelector(selector);
}
$('#iniciaSesion').addEventListener('click',()=>{
    //window.location.replace("../html/registro.html");
    //window.open("../html/registro.html");
    const correo=$("#correo").value;
    const pass=$("#password").value;
    let totalCuentas=parseInt(localStorage.getItem("numCuentas"));
    let i=1;
    let cuentaEncontrada=false;
    while(i<=totalCuentas && !cuentaEncontrada){
        let info = JSON.parse(localStorage.getItem(`cuenta${i}`));
        if(correo==info.correo){
            cuentaEncontrada=true;
        }
    }
    if(cuentaEncontrada){
        if(pass!=info.contraseña){
            $(".errSesion").classList.add("active");
            $(".cuentaNoExist").classList.remove("active");
        }else{
            //location.href="../html/sesionIniciada.html";
            console.log("Sesion inicada :3");
        }  
    }else{
        $(".errSesion").classList.remove("active");
        $(".cuentaNoExist").classList.add("active");
    }
    
});