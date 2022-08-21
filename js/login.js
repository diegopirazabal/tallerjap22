function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function logear(){
    //Creo usuario
    let user = {};
    user.nombre = document.getElementById('username').value;
    user.pass = document.getElementById('clave').value;
    // Si no se ingreso mail alerta error
    if (user.nombre == "" || user.pass ==""){
        showAlertError();
    }else{
        //Si ingresa datos validos logea
        localStorage.setItem('usuarioLogeado',JSON.stringify(user))
        location.href = "index.html"
    }
}
//Funcion que permite logear con "enter"
document.getElementById('clave').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("inicio").click();
    }
  });

document.getElementById('inicio').addEventListener('click',()=>{
    logear();
})
