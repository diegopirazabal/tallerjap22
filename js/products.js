let productsArray = [];
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "az";
const ORDER_BY_PROD_COUNT2 = "za"
const ORDER_BY_PROD_COUNT3 = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function showProductsList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      product.image +
      `" alt="product.name" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      product.name +
      ` - ` +
      product.currency +
      ` ` +
      product.cost +
      `</h4> 
                        <p> ` +
      product.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      product.soldCount +
      ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT2){
        result = array.sort(function(a, b) {
            let aCount2 = parseInt(a.cost);
            let bCount2 = parseInt(b.cost);
            
            if ( aCount2 < bCount2 ){ return -1; }
            if ( aCount2 > bCount2 ){ return 1; }
            return 0;
    })
    }else if (criteria === ORDER_BY_PROD_COUNT3){
        result = array.sort(function(a, b) {
            let aCount3 = parseInt(a.soldCount);
            let bCount3 = parseInt(b.soldCount);

            if ( aCount3 < bCount3 ){ return 1; }
            if ( aCount3 > bCount3 ){ return -1; }
            return 0;
    });

    return result;
}}


function sortAndShowProducts(sortCriteria, Array){
    currentSortCriteria = sortCriteria;

    if(Array != undefined){
        currentProductsArray = Array;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList(currentProductsArray);
}

function filtradoPorPrecio(array){
    minCost = parseInt(document.getElementById("rangeFilterCountMin").value);
    maxCost = parseInt(document.getElementById("rangeFilterCountMax").value);

    let listaFiltrada = array.filter(producto => producto.cost >= minCost && producto.cost <= maxCost);

    showProductsList(listaFiltrada);
}




let catID = localStorage.getItem("catID");


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductsList(productsArray);
    }
  });
  let user = JSON.parse(localStorage.getItem("usuarioLogeado"));
  document.getElementById("usertag").innerHTML =
    user.nombre + " - Cerrar Sesion";
  document.getElementById("usertag").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    alert("Sesion Cerrada");
    location.href = "index.html";
  });

//   document.getElementById("sortAsc").addEventListener("click", function(){
//     sortAndShowProducts(ORDER_ASC_BY_NAME, productsArray);
// });

// document.getElementById("sortDesc").addEventListener("click", function(){
//     sortAndShowProducts(ORDER_DESC_BY_NAME, productsArray);
// });

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_COUNT, productsArray);
});

document.getElementById("sortByCount2").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_COUNT2, productsArray);
});

document.getElementById("sortByCount3").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_COUNT3, productsArray);
});


document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList(productsArray);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    filtradoPorPrecio(productsArray);
});

});
