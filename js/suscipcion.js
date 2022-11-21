let info={
    nombre:"a",
    apellidos:"b",
    correo: "a@g.com",
    contraseña: "asdasd",
    movil: "666 666 666",
    observaciones:"",
    suscripcion:"Iniciado",
}
let carrito=[];
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
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))||[];
        actualizarCarrito()
    }
})
cursos.forEach((prod)=>{
    if(info.suscripcion==prod.nivel){
        const {id,nivel,nombre,precio,descripcion,img,direccion,duracion,horario,cantidad}=prod;
        if(img!=""){
            $(".cursos").innerHTML += `<div class="curso>
                <h3>${nombre}</h3>
                <p>Nivel: ${nivel}</p>
                <p>Descripcion: ${descripcion}</p>
                <img src="${img}">
                <p>Direcion: ${direccion}</p>
                <p>Duracion: ${duracion}</p>
                <p>horario: ${horario}</p>
                <p>Precio: ${precio}</p>
                <div class="btn" id="comprar${id}">Comprar</div>
            </div>`
            $(`#comprar${id}`).addEventListener('click',()=>{
                aniadeProducto(id);
            })
        }else{
            $(".cursos").innerHTML += `<div class="curso>
            <h3>${nombre}</h3>
            <p>Nivel: ${nivel}</p>
            <p>Descripcion: ${descripcion}</p>
            <p>Direcion: ${direccion}</p>
            <p>Duracion: ${duracion}</p>
            <p>horario: ${horario}</p>
            <p>Precio: ${precio}€</p>
            <div class="btn" id="comprar${id}">Comprar</div>
        </div>`
        $(`#comprar${id}`).addEventListener('click',()=>{
            aniadeProducto(id);
        })
        }
    }
})

const aniadeProducto =(id)=>{
    const existe = carrito.some(producto=>producto.id==id);
    console.log(existe);
    if(existe){
        const prod = carrito.map(prod=>{
            if(prod.id==id){
                prod.cantidad++;
            }
        })
    }else{
        const item = cursos.find((producto)=>producto.id==id);
        carrito.push(item)
    }
    actualizarCarrito();
}
function actualizarCarrito(){
    $(".contenido").innerHTML="";
    carrito.forEach((prod)=>{
        const {nombre,precio,cantidad}=prod;
        $(".contenido").innerHTML+=`<div class="producto">
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}€</p>
            <p>Cantidad :${cantidad}</p>
            <div class="btn" id="eliminarProducto${prod.id}">Eliminar</div>
        </div>`;
        const boton= document.getElementById(`eliminarProducto${prod.id}`);
        boton.addEventListener('click',()=>{
            eliminarProducto(prod.id);
        })
    })
    $("#contadorCarrito").textContent=`🛒${carrito.length}`;
    $(".total").textContent=`Total: ${carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)}€`;
    guardarStorage();
}
function eliminarProducto(id){
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    actualizarCarrito();
}
function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
$("#contadorCarrito").addEventListener('click',()=>{
    $(".carrito").classList.add("active");
})
$("#cerrar").addEventListener('click',()=>{
    $(".carrito").classList.remove("active");
})
$("#vaciar").addEventListener('click',()=>{
    carrito.length=[];
    actualizarCarrito();
})