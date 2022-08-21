let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let product = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product.name" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +` - `+ product.currency +` `+ product.cost +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    document.getElementById('usertag').innerHTML = user.nombre+' - Cerrar Sesion';
    document.getElementById('usertag').addEventListener("click",()=>{
        localStorage.removeItem('usuarioLogeado')
        alert('Sesion Cerrada')
        location.href = "index.html"
       })
});