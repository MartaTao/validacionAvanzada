let info;
let carrito=[];
function $(selector){
    return document.querySelector(selector);
}
$('#iniciaSesion').addEventListener('click',()=>{
    const correo=$("#correo").value;
    const pass=$("#password").value;
    let totalCuentas=sessionStorage.getItem("numCuentas");
    if(totalCuentas>0){
        let i=0;
        let cuentaEncontrada=false;
        for(;i<totalCuentas;i++){
            info = JSON.parse(sessionStorage.getItem(`cuenta${i}`));
            if(correo==info.correo){
                cuentaEncontrada=true;
            }
        }
        if(cuentaEncontrada){
            if(pass!=info.contraseña){
                $(".errSesion").classList.add("active");
                $(".cuentaNoExist").classList.remove("active");
            }else{
                $(".formulario").classList.remove("active");
                $(".perfil").classList.add("active");
                muestraPerfil();
            }  
        }else{
            $(".errSesion").classList.remove("active");
            $(".cuentaNoExist").classList.add("active");
        }
    }else{
        $(".cuentaNoExist").textContent="No hay ninguna cuenta creada actualmente";
        $(".cuentaNoExist").classList.add("active");
    }
    
});
function muestraPerfil(){
    switch (info.suscripcion){
        case "Basico":
            $(".bienvenida").textContent=`Bienvenido ${info.nombre}`;
        break;
        case "Iniciado":
            $(".bienvenida").textContent=`Bienvenido iniciado/a ${info.nombre}`;
        break;
        case "Intermedio":
            $(".bienvenida").textContent=`Bienvenido intermedio/a ${info.nombre}`;
        break;
        case "Experto":
            $(".bienvenida").textContent=`Bienvenido experto/a ${info.nombre}`;
        break;
        case "Sibarita":
            $(".bienvenida").textContent=`Bienvenido sibarita ${info.nombre}`;
        break;
    }
    cursos.forEach((prod)=>{
        if(info.suscripcion==prod.nivel){
            const {id,nivel,nombre,precio,descripcion,img,direccion,duracion,horario}=prod;
            if(img!=""){
                $(".cursos").innerHTML += `
                <div class="card">
                    <div class="curso">
                        <h3>${nombre}</h3>
                        <p>Nivel: ${nivel}</p>
                        <p>Descripcion: ${descripcion}</p>
                        <img src="${img}">
                        <p>Direcion: ${direccion}</p>
                        <p>Duracion: ${duracion}</p>
                        <p>horario: ${horario}</p>
                        <p>Precio: ${precio} 2 personas</p>
                        <div class="btn comprar" id="comprar${id}">Comprar</div>
                    </div>
                </div>`
                $(`#comprar${id}`).addEventListener('click',()=>{
                    aniadeCurso(id);
                })
            }else{
                $(".cursos").innerHTML += `
                <div class="card">
                    <div class="curso">
                        <h3>${nombre}</h3>
                        <p>Nivel: ${nivel}</p>
                        <p>Descripcion: ${descripcion}</p>
                        <p>Direcion: ${direccion}</p>
                        <p>Duracion: ${duracion}</p>
                        <p>horario: ${horario}</p>
                        <p>Precio: ${precio}€</p>
                        <div class="btn comprar" id="comprar${id}">Comprar</div>
                    </div>
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
                $(".paquetes").innerHTML += `
                <div class="card">
                    <div class="paquete">
                        <h3>${nombre}</h3>
                        <p>Descripcion: ${descripcion}</p>
                        <img src="${img}">
                        <p>Direcion: ${direccion}</p>
                        <p>Duracion: ${duracion}</p>
                        <p>Precio: ${precio}</p>
                        <div class="btn comprar" id="comprar${id}">Comprar</div>
                    </div>
                </div>`
                $(`#comprar${id}`).addEventListener('click',()=>{
                    aniadePaquete(id);
                })
            }else{
                $(".paquetes").innerHTML += `
                <div class="card">
                    <div class="paquete">
                        <h3>${nombre}</h3>
                        <p>Descripcion: ${descripcion}</p>
                        <p>Direcion: ${direccion}</p>
                        <p>Duracion: ${duracion}</p>
                        <p>Precio: ${precio}€</p>
                        <div class="btn comprar" id="comprar${id}">Comprar</div>
                    </div>
                </div>`
                $(`#comprar${id}`).addEventListener('click',()=>{
                    aniadePaquete(id);
                })
            }
        })
    }
    
}

document.addEventListener('DOMContentLoaded',()=>{
    if (sessionStorage.getItem('carrito')){
        carrito = JSON.parse(sessionStorage.getItem('carrito'))||[];
        actualizarCarrito()
    }
})

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
        $(".contenido").innerHTML+=`
        <div class="producto">
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}€</p>
            <p>Cantidad :${cantidad}</p>
            <div class="btn eliminar" id="eliminarProducto${prod.id}">Eliminar</div>
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
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
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
    Email.send({
        SecureToken:"85779b15-3446-4df6-9b61-f5811d19f78a",
        To:`${info.correo}`,
        From:"martataofernandez.19@campuscamara.es",
        Subject:"Estado de la compra",
        Body:`Sr/a ${info.nombre},
        Le infromamos que su compra ha sido realizada exitosamente.
        Un cordial saludo,
        Marta`
    })
    $(".facturacion").classList.remove("active");
    $(".agradecimiento").classList.add("active");
    muestraTicket();
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
$("#volver").addEventListener('click',()=>{
    $(".agradecimiento").classList.remove("active");
    $(".perfil").classList.add("active");
    $(".carrito").classList.remove("active");
    carrito.length=[];
    actualizarCarrito();
    guardarStorage();
})