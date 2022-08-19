
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

   let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
   
   if (user == null){
    alert('Es necesario ingresar para navegar por el sitio.');
    location.href = "login.html"
   }else{
    document.getElementById('usertag').innerHTML = user.nombre+' - Cerrar Sesion';
   }

   document.getElementById('usertag').addEventListener("click",()=>{
    localStorage.removeItem('usuarioLogeado')
    alert('Sesion Cerrada')

    location.href = "index.html"
   })
});