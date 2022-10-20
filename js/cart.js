let usuario = 25801;
let listaCarrito = [];

function total(){
    let total = 0;
    let cantidad = parseInt((document.getElementById('unidades').value));
    let costo = listaCarrito[0].unitCost;
    console.log(cantidad)

    total = cantidad * costo;
 
    document.getElementById('subtotal').innerHTML = ` ${total}`;
}

function showCart(){
        let HTMLContentToAppend = "";


        // for (let i = 0; i < listaCarrito.length; i++){
            let item = listaCarrito[0];

            HTMLContentToAppend += `
            <table class="table border-top">
            <tr>
                <td scope="row">
                    <img src="${item.image}" style="width: 80px;">
                </td>
                <td>
                    <strong>${item.name}</strong>
                </td>
                <td>
                    <strong>${item.currency} ${item.unitCost}</strong>
                </td>
                <td>
                <input type="number" class="form-control" id="unidades" placeholder="1" value="1" required>
                </td>
                <td>
                <strong>${item.currency}<span id="subtotal"></span></strong>
                </td>
            </tr>
            </table>
            
            `
            document.getElementById('carro').innerHTML = HTMLContentToAppend;
        // }
    };







document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            listaCarrito = resultObj.data.articles;
            
            showCart();
            total();
        }
    })

    document.addEventListener("change", ()=>{
        total();
    })

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


})