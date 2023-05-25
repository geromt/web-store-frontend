function dropdown(idDropdown) {
  var dropdown = document.getElementById(idDropdown);
  if (dropdown.style.visibility == "hidden"){
    dropdown.style.visibility = "visible";
  } else {
    dropdown.style.visibility = "hidden"
  }
}

function accedePerfil() {
  if (sessionStorage.getItem("id_usuario")) {
    const iniciaSesion = document.getElementById("inicia-sesion");
    iniciaSesion.innerHTML = "Perfil";
    iniciaSesion.setAttribute("href", "./usuario.html");
  }
}

document.getElementById("unete-dropdown").style.visibility = "hidden";
document.getElementById("comprar-dropdown").style.visibility = "hidden";