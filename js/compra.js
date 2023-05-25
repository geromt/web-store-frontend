async function getProductos(tipo) {
    const tempHTML = `<div class="carta">
      <div class="imagen">
        <img src="" alt="Iphone 14"/>
      </div>
      <div class="contenido">
        <h2></h2>
        <h3></h3>
        <h3 class="precio"></h3>
        <div class="color">
          <h3>Color :</h3>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a onclick="confirmarCompra()">Compra Ahora</a>
      </div>
    </div>`;

    const response = await fetch("https://tienda-web-api.000webhostapp.com/get-products.php?id_tipo=" + tipo);
    const jsonData = await response.json();
    console.log("Productos: " + jsonData[0]["nombre"]);
    
    const gridProductos = document.getElementsByClassName("grid-productos")[0];
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});


    for (i = 0; i < jsonData.length; i++){
        const temp = document.createElement('div');
        temp.id = jsonData[i]["id"];
        temp.classList.add("producto");
        temp.insertAdjacentHTML("afterbegin", tempHTML);

        const image = temp.getElementsByTagName("img")[0];
        image.src = "../media/" + jsonData[i]["foto"];
      
        const nombre = temp.getElementsByTagName("h2")[0];
        nombre.innerHTML = jsonData[i]["nombre"];

        const descripcion = temp.getElementsByTagName("h3")[0];
        descripcion.innerHTML = jsonData[i]["descripcion"];

        const precio = temp.getElementsByClassName("precio")[0];
        precio.innerHTML = "Desde " + formatter.format(jsonData[i]["costo"]);

        const boton = temp.getElementsByTagName("a")[0];
        boton.setAttribute("onclick", "confirmarCompra(" + jsonData[i]["id"] + ")");

        gridProductos.insertBefore(temp, gridProductos.childNodes[0]);
    }
}

async function getComments(id_producto) {
    const tempHTML = `<div class="comentario-rect">
      <div class="nombre">
      </div>
      <div class="mensaje">
      </div>
    </div>
    <div class="fecha">
    </div>`;

    const response = await fetch("https://tienda-web-api.000webhostapp.com/get-comments.php?id_producto=" + id_producto);
    const jsonData = await response.json();
    console.log(jsonData);
    
    const comentariosCont = document.getElementsByClassName("comentarios-container")[0];
    comentariosCont.innerHTML = "";

    for (i = 0; i < jsonData.length; i++){
        const temp = document.createElement('div');
        temp.classList.add("comentario");
        temp.insertAdjacentHTML("afterbegin", tempHTML);

        const nombre = temp.getElementsByClassName("nombre")[0];
        nombre.innerHTML = jsonData[i]["nombre_usuario"] + " " + jsonData[i]["apellido_usuario"];

        const mensaje = temp.getElementsByClassName("mensaje")[0];
        mensaje.innerHTML = jsonData[i]["comentario"];

        const fecha = temp.getElementsByClassName("fecha")[0];
        fecha.innerHTML = jsonData[i]["fecha_hora"];

        comentariosCont.insertBefore(temp, comentariosCont.childNodes[0]);
    }
}

function confirmarCompra(id) {
    var producto = document.getElementById(id);
    var imagen = producto.getElementsByTagName("img")[0].getAttribute("src");
    var nombre = producto.getElementsByTagName("h2")[0].innerText;
    var descripcion = producto.getElementsByTagName("h3")[0].innerText;
    var precio = producto.getElementsByClassName("precio")[0].innerText;
    var modal = document.getElementsByClassName("confirmacion")[0];
    
    document.getElementById("confirmacion-imagen").setAttribute("src", imagen);
    document.getElementById("confirmacion-nombre").innerHTML = nombre;
    document.getElementById("confirmacion-descripcion").innerHTML = descripcion;
    document.getElementById("confirmacion-precio").innerHTML = precio;
    document.getElementById("id-holder").innerHTML = id;
    document.getElementById("id_producto").value = id;
  
    modal.style.display = "block";

    getComments(id);
}
  
async function comprar() {
    const idProducto = document.getElementById("id-holder").innerText;
    const idUsuario = sessionStorage.getItem("id_usuario");
    const fechaHora = getTime();

    const response = await fetch("https://tienda-web-api.000webhostapp.com/comprar.php", {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `id_usuario=${idUsuario}&id_producto=${idProducto}&fecha_hora=${fechaHora}`,
    });
    const jsonData = await response.json();
    console.log(jsonData);

    if (jsonData["status"] == "success") {
      document.getElementById("exito-compra").style.display = "block";
    } else {
      alert("No se pudo procesar la compra")
    };

    ocultarConfirmacion();
}

function continuar(){
  document.getElementById("exito-compra").style.display = "none";
}
  
function ocultarConfirmacion() {
    var modal = document.getElementsByClassName("confirmacion")[0];
    modal.style.display = "none";
}
  
window.onclick = function(event) {
    var modal = document.getElementsByClassName("confirmacion")[0];
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getTime(){
  var date = new Date();
  return GetFormattedDate(date);
}

function GetFormattedDate(date) {
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day  = ("0" + (date.getDate())).slice(-2);
  var year = date.getFullYear();
  var hour =  ("0" + (date.getHours())).slice(-2);
  var min =  ("0" + (date.getMinutes())).slice(-2);
  var seg = ("0" + (date.getSeconds())).slice(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" +  min + ":" + seg;
}