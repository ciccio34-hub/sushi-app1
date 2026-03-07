let cart = [];
let total = 0;

function addToCart(name, price){

cart.push({name, price});
total += price;

updateCart();

}

function updateCart(){

let cartList = document.getElementById("cart");
cartList.innerHTML = "";

cart.forEach(item => {

let li = document.createElement("li");
li.textContent = item.name + " - €" + item.price;
cartList.appendChild(li);

});

document.getElementById("total").textContent = "Totale: €" + total;

}

function sendOrder(){

let orderText = "Ordine Sushi:%0A";

cart.forEach(item=>{
orderText += item.name + " €" + item.price + "%0A";
});

orderText += "Totale €" + total;

let phone = "391234567890"; 

let url = "https://wa.me/"+phone+"?text="+orderText;

window.open(url);

}




