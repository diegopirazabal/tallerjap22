let usuario = 25801;
let listaCarrito = [];

function total(){
    let total = 0;
    let cantidad = parseInt((document.getElementById('unidades').value));
    let costo = listaCarrito[0].unitCost;
    total = cantidad * costo;
 
    document.getElementById('subtotal').innerHTML = ` ${total}`;
    
  
}

function tabla(){
  let total = 0;
    let cantidad = parseInt((document.getElementById('unidades').value));
    let costo = listaCarrito[0].unitCost;
    total = cantidad * costo;
  document.getElementById('subtotalTabla').innerHTML = `${listaCarrito[0].currency} `+`${total}`
  

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


function envios() {
  let tipoEnvio = document.getElementsByName('envio');
  let totalEnvio = 0;
  let parcialEnvio = 0;
  for (let i = 0; i < tipoEnvio.length; i++){
    if (tipoEnvio[i].checked){
      totalEnvio = ( listaCarrito[0].unitCost* parseFloat(tipoEnvio[i].value) + (listaCarrito[0].unitCost * parseInt((document.getElementById('unidades').value))))
      parcialEnvio = (listaCarrito[0].unitCost * parseFloat(tipoEnvio[i].value))
    }
    
  document.getElementById('totalTabla').innerHTML = `${listaCarrito[0].currency}` + `${totalEnvio}`;
  document.getElementById('envio').innerHTML = `${listaCarrito[0].currency}` + `${parcialEnvio}`;
  }   
}

function metodosDePago(){
  let metodo = document.getElementsByName('metodo');
  for (let i = 0; i < metodo.length; i++){
    if (metodo[i].checked){
      if (parseFloat(metodo[i].value) === 1){
        document.getElementById('cardNumber').setAttribute('disabled', "")
        document.getElementById('vencimiento').setAttribute('disabled', "")
        document.getElementById('secCode').setAttribute('disabled', "")
        document.getElementById('accountNumber').removeAttribute('disabled', "")
        document.getElementById('accountNumber').setAttribute('required', "")
      }else{
        document.getElementById('accountNumber').setAttribute('disabled', "")
        document.getElementById('cardNumber').removeAttribute('disabled', "")
        document.getElementById('vencimiento').removeAttribute('disabled', "")
        document.getElementById('secCode').removeAttribute('disabled', "")
        document.getElementById('cardNumber').setAttribute('required', "")
        document.getElementById('vencimiento').setAttribute('required', "")
        document.getElementById('secCode').setAttribute('required', "")
        
      }
    }
  }
}
function myValidations() {
  let cantidad = parseInt(document.getElementById('unidades').value)
  let metodos = document.getElementByName("metodo");
  let validity = true;
  console.log(cantidad)
  if (cantidad <= 0){
    validity = false;
  }

  if (!metodos[0].checked) {
    validity = false;
    console.log('debeingresarmetododepago')
  }

  if (!metodos[1].checked) {
      validity = false;
     console.log('debeingresarmetododepago')
  } else {
      document.getElementById("btn-modal-terminos").classList.remove("invalid-color");
      document.getElementById("feedback-modal-terminos").style.display = "none";
  }

  return validity;
}

document.getElementById("formulario").addEventListener('submit', event => {
  if (!myValidations() || !this.checkValidity()) {
      
      event.preventDefault();
      event.stopPropagation();
  }else{
    document.getElementById('alertaCompra').removeAttribute('style')
    document.getElementById('alertaCompra').addAttribute('style', "display: inline;")
  }
  document.body.classList.add('was-validated');
  ['change', 'input'].forEach(ev => { document.body.addEventListener(ev, myValidations)})
})




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            listaCarrito = resultObj.data.articles;
            
            showCart();
            total();
            tabla();
            metodosDePago();
        }
    })

    document.addEventListener("change", ()=>{
        total();
        tabla();
        envios();
        metodosDePago();
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