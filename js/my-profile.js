let usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
let datosGuardados;
//funcion de bootstrap para validations.
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            datosGuardados = false;
            localStorage.setItem('datosGuardados', datosGuardados)
          }else{
            let datosUsuario = {};
            datosUsuario.nombre1 = document.getElementById('nombre').value;
            datosUsuario.nombre2 = document.getElementById('segundoNombre').value;
            datosUsuario.apellido1 = document.getElementById('apellido').value;
            datosUsuario.apellido2 = document.getElementById('segundoApellido').value;
            datosUsuario.telefono = document.getElementById('telNumber').value;
            datosUsuario.username = usuario.nombre;
            datosGuardados = true;
            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
            localStorage.setItem('datosGuardados', datosGuardados)
            location.href = "my-profile.html"
            console.log(datosUsuario)
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function user(){
    document.getElementById('username').value = usuario.nombre;
    let datosViejos = (JSON.parse(localStorage.getItem("datosUsuario")))
        document.getElementById('nombre').value = datosViejos.nombre1;
        document.getElementById('segundoNombre').value = datosViejos.nombre2;
        document.getElementById('apellido').value = datosViejos.apellido1;
        document.getElementById('segundoApellido').value = datosViejos.apellido2;
        document.getElementById('telNumber').value = datosViejos.telefono;
    
}

document.addEventListener('DOMContentLoaded', ()=>{
    user();
})