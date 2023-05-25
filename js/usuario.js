if (!sessionStorage.getItem("id_usuario")) {
    window.location.href = "./acceder.html";
}

const bienvenida = document.getElementById("bienvenida");
if (sessionStorage.getItem("nombre")){
    bienvenida.innerHTML = "Bienvenido(a) " + sessionStorage.getItem("nombre") + " " + sessionStorage.getItem("apellido-paterno");
}
const email = document.getElementById("email");
if ( sessionStorage.getItem("email")){
    email.innerHTML = sessionStorage.getItem("email");
}
const nacimiento = document.getElementById("nacimiento");
if ( sessionStorage.getItem("nacimiento")){
    nacimiento.innerHTML = sessionStorage.getItem("nacimiento");
}
const telefono = document.getElementById("telefono");
if ( sessionStorage.getItem("telefono")){
    telefono.innerHTML = sessionStorage.getItem("telefono");
}

function CerrarSesion(){
    sessionStorage.clear();
    window.location.href = "./index.html"
}

async function getCompras(id) {
    const tempHTML = `<td class="fecha"></td>
      <td class="producto"></td>
      <td class="costo"></td>`;

    const response = await fetch("https://tienda-web-api.000webhostapp.com/get-compras.php?id_usuario=" + id);
    const jsonData = await response.json();
    console.log(jsonData);

    const comprasTable = document.getElementById("compras-table");
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

    for (i = 0; i < jsonData.length; i++){
        const temp = document.createElement('tr');
        temp.insertAdjacentHTML("beforeend", tempHTML);

        const fecha = temp.getElementsByClassName("fecha")[0];
        fecha.innerHTML = jsonData[i]["fecha_hora"];
  
        const producto = temp.getElementsByClassName("producto")[0];
        producto.innerHTML = jsonData[i]["nombre_producto"];

        const costo = temp.getElementsByClassName("costo")[0];
        costo.innerHTML = formatter.format(jsonData[i]["costo"]);

        comprasTable.appendChild(temp);
    }
}