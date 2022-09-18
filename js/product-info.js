let prodInfoArray = [];
let commentsArray = [];
function mostrarInfo(array){
    let name = array.name;
    let price = array.cost 
    let currency = array.currency
    let description = array.description
    let category = array.category
    let soldCount = array.soldCount
    document.getElementById('nombre').innerHTML = name ;
    document.getElementById('precio').innerHTML = price + `$ - ` + currency; 
    document.getElementById('descripcion').innerHTML = description;
    document.getElementById('categoria').innerHTML = category; 
    document.getElementById('cantidadDeVendidos').innerHTML = soldCount;
}   


function mostrarImagenes(array){
    let HTMLContentToAppend = "";
    for(let i = 0; i < array.images.length; i++){
        let src = array.images[i];
        console.log(src)
        HTMLContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class=" mb-4 h-100">
                <img class="img-fluid img-thumbnail img-fit" src="${src}" alt="">
            </div>
        </div>
        `

        document.getElementById('imagenes').innerHTML = HTMLContentToAppend;
    }
}

function mostrarPuntuacion(array){
    let estrellas = "";
    for (let i = 0; i < 5; i++) {
        if (i <= array.score){
            estrellas += '<span class="fas fa-star checked"></span>'
        }else{
            estrellas += '<span class="far fa-star"></span>'
        }
    }
    return estrellas;
}


function mostrarComentarios(array){
    let HTMLContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        HTMLContentToAppend += `
        <div class="border">
            <h4>${comment.user}</h4><h6>${comment.dateTime}</h6>
            <h5>${comment.description}</h5>
            ` + mostrarPuntuacion(comment) + `
        </div>
        `
        estrellas = ""
        console.log(comment.user)
    }
    document.getElementById('comentarios').innerHTML = HTMLContentToAppend; 
}

document.addEventListener("DOMContentLoaded", ()=>{
    let prodID = localStorage.getItem("prodID");
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok") {
            prodInfoArray = resultObj.data;
            mostrarInfo(prodInfoArray);
            mostrarImagenes(prodInfoArray);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function(resultObjeto){
        if (resultObjeto.status === "ok") {
            commentsArray = resultObjeto.data;
            mostrarComentarios(commentsArray)
            
        }
    })
})
