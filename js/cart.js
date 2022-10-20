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

function showCart(array){
        let HTMLContentToAppend = "";


        for (let i = 0; i < listaCarrito.length; i++){
            let item = listaCarrito[i];

            HTMLContentToAppend += `
            <table class="table border-top">
            <tr>
                <td scope="row"><img src="${item.image}" style="width: 80px;"></td>
                <td><strong>${item.name}</strong></td>
                <td><strong>${item.currency} <span>${item.unitCost}</strong></span></td>
                <td><input type="number" class="form-control" id="unidades" placeholder="1" value="1" required></td>
                <td><strong>${item.currency}<span id="subtotal"></span></strong></td>
            </tr>
            
            `
            document.getElementById('carro').innerHTML = HTMLContentToAppend;
        }
    };







document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            listaCarrito = resultObj.data.articles;
            console.log(listaCarrito)
            showCart(listaCarrito);
            total();
        }
    })

    document.addEventListener("change", ()=>{
        total();
    })
})