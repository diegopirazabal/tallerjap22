function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function logear(){
    //Creo usuario
    let user = {};
    user.nombre = document.getElementById('username').value;
    user.pass = document.getElementById('clave').value;
    // Si se ingreso un mail y password va al index y guarda el user
    if (user.nombre == "" || user.pass ==""){
        showAlertError();
    }else{
        localStorage.setItem('usuarioLogeado',JSON.stringify(user))
        location.href = "index.html"
    }
}


document.getElementById('inicio').addEventListener('click',()=>{
    logear();
})
