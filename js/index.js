
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let user = JSON.parse(localStorage.getItem("usuarioLogeado"));

    if (user == null) {
      alert("Es necesario ingresar para navegar por el sitio.");
      location.href = "login.html";
    } else {
      document.getElementById("usertag").innerHTML =
        `<div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        ` +
        user.nombre +
        `
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
        <li><a class="dropdown-item" href="#" id="logout">Cerrar Sesion</a></li>
      </ul>
    </div>`;
    }
  
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogeado");
      alert("Sesion Cerrada");
      location.href = "index.html";
    });
});