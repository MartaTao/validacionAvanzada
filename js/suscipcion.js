let info={
    nombre:"a",
    apellidos:"b",
    correo: "a@g.com",
    contraseña: "asdasd",
    movil: "666 666 666",
    observaciones:"",
    suscripcion:"Iniciado",
}
function $(selector){
    return document.querySelector(selector);
}
switch (info.suscripcion){
    case "Basico":
        $(".bienvenida").textContent="novato";
    break;
    case "Iniciado":
        $(".bienvenida").textContent="iniciado";
    break;
    case "Intermedio":
        $(".bienvenida").textContent="intermedio";
    break;
    case "Experto":
        $(".bienvenida").textContent="experto";
    break;
    case "Sibarita":
        $(".bienvenida").textContent="sibarita";
    break;
}
document.addEventListener('DOMContentLoaded',()=>{
    fecthInfo();
})
const fecthInfo=async()=>{//Recojo la informacion del .jason y ahsta que no termina no sigue el script
    const res = await fetch('../other/cursos.json');
    const datos = await res.json();
    muestraCurso(datos);
}
const muestraCurso=datos=>{
    let i=1;
    datos.forEach(curso => {
        if(info.suscripcion==curso.nivel){
            let div=document.createElement("div");
            div.setAttribute("class","curso");
            div.setAttribute("id",`curso${i}`);
            $(".cursos").appendChild(div);
            let nombre=document.createElement("h2");
            nombre.setAttribute("class","nombre");
            nombre.setAttribute("id",`nombre${i}`)
            $(`#curso${i}`).appendChild(nombre);
            $(`#nombre${i}`).textContent=curso.nombre;
            let descripcion=document.createElement("p")
            descripcion.setAttribute("class","descripcion");
            descripcion.setAttribute("id",`descripcion${i}`);
            $(`#curso${i}`).appendChild(descripcion);
            $(`#descripcion${i}`).textContent=curso.descripcion;
            if(curso.img!=""){
                let img=document.createElement("img")
                img.setAttribute("class","imagen");
                img.setAttribute("id",`img${i}`);
                img.setAttribute("src",`${curso.img}`);
                $(`#curso${i}`).appendChild(img);
            }
        }
    });
}