let info={
    nombre:"a",
    apellidos:"b",
    correo: "alejandrodominguez.20@campuscamara.es",
    contraseña: "asdasd",
    movil: "666 666 666",
    observaciones:"",
    suscripcion:"Iniciado",
    metodoPago:{
        numTarjtea:"6666 6666 6666",
        mesExp:"02",
        anioExp:"28",
        numCVV:"1234",
    }
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
        const {id,nivel,nombre,precio,descripcion,img,direccion,duracion,horario}=prod;
        if(img!=""){
            $(".cursos").innerHTML += `<div class="curso">
                <h3>${nombre}</h3>
                <p>Nivel: ${nivel}</p>
                <p>Descripcion: ${descripcion}</p>
                <img src="${img}">
                <p>Direcion: ${direccion}</p>
                <p>Duracion: ${duracion}</p>
                <p>horario: ${horario}</p>
                <p>Precio: ${precio} 2 personas</p>
                <div class="btn" id="comprar${id}">Comprar</div>
            </div>`
            $(`#comprar${id}`).addEventListener('click',()=>{
                aniadeCurso(id);
            })
        }else{
            $(".cursos").innerHTML += `<div class="curso">
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
                aniadeCurso(id);
            })
        }
    }
});
if(info.suscripcion!="Basico"){
    paquetes.forEach((paq)=>{
        const {id,nombre,precio,descripcion,img,direccion,duracion}=paq;
        if(img!=""){
            $(".paquetes").innerHTML += `<div class="paquete">
                <h3>${nombre}</h3>
                <p>Descripcion: ${descripcion}</p>
                <img src="${img}">
                <p>Direcion: ${direccion}</p>
                <p>Duracion: ${duracion}</p>
                <p>Precio: ${precio}</p>
                <div class="btn" id="comprar${id}">Comprar</div>
            </div>`
            $(`#comprar${id}`).addEventListener('click',()=>{
                aniadePaquete(id);
            })
        }else{
            $(".paquetes").innerHTML += `<div class="paquete">
                <h3>${nombre}</h3>
                <p>Descripcion: ${descripcion}</p>
                <p>Direcion: ${direccion}</p>
                <p>Duracion: ${duracion}</p>
                <p>Precio: ${precio}€</p>
                <div class="btn" id="comprar${id}">Comprar</div>
            </div>`
            $(`#comprar${id}`).addEventListener('click',()=>{
                aniadePaquete(id);
            })
        }
    })
}

const aniadeCurso =(id)=>{
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
const aniadePaquete =(id)=>{
    const existe = carrito.some(producto=>producto.id==id);
    console.log(existe);
    if(existe){
        const prod = carrito.map(prod=>{
            if(prod.id==id){
                prod.cantidad++;
            }
        })
    }else{
        const item = paquetes.find((producto)=>producto.id==id);
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
$("#pagar").addEventListener('click',()=>{
    if(!carrito.length==0){
        $(".facturacion").classList.add("active");
        $(".perfil").classList.remove("active");
        procesarPedido();
    }
})
function procesarPedido(){
    let fila;
    carrito.forEach((prod)=>{
        const {nombre,precio,cantidad}=prod;
        fila=document.createElement("tr");
        fila.innerHTML+=`<td>${nombre}</td><td>${precio}</td><td>${cantidad}</td><td>${cantidad*precio}</td>`
        $(".factura tbody").appendChild(fila);
    })
    fila=document.createElement("tr");
    fila.innerHTML+=`<th>Total a pagar</th><td></td><td></td><td>${carrito.reduce((acc,prod)=>acc+prod.cantidad*prod.precio,0)}</td>`
    $(".factura").appendChild(fila);
    $(".tarjeta").value=info.metodoPago.numTarjtea;
    $("#mes").value=info.metodoPago.mesExp;
    $("#anio").value=info.metodoPago.anioExp;
    $(".cvv").value=info.metodoPago.numCVV;
}
$("#finalizar").addEventListener('click',()=>{
    carrito.length=[];
    Email.send({
        SecureToken:"85779b15-3446-4df6-9b61-f5811d19f78a",
        To:`${info.correo}`,
        From:"martataofernandez.19@campuscamara.es",
        Subject:"Compra realizada",
        Body:"Es una prueba"
    })
    $(".facturacion").classList.remove("active");
    $(".agradecimiento").classList.add("active");
});
function muestraTicket(){
    let fila;
    carrito.forEach((prod)=>{
        const {nombre,duracion,direccion}=prod;
        fila=document.createElement("tr");
        fila.innerHTML+=`<td>${nombre}</td><td>${duracion}</td><td>${direccion}</td>`
        $(".agenda tbody").appendChild(fila);
    })
}