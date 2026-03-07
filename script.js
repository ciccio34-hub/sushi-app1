let cart = [];
let total = 0;

function addToCart(name,price){

cart.push({name,price});
total += price;

updateCart();

}

function updateCart(){

let cartList = document.getElementById("cart");
cartList.innerHTML="";

cart.forEach(item=>{

let li = document.createElement("li");
li.textContent = item.name + " €" + item.price;

cartList.appendChild(li);

});

document.getElementById("total").innerText = "Totale: €"+total;

}

async function sendOrder(){

const order = {
items: cart,
total: total,
date: new Date()
};

const repo = "USERNAME/REPO";
const token = "GITHUB_TOKEN";

const fileName = "orders/order-"+Date.now()+".json";

const content = btoa(JSON.stringify(order,null,2));

await fetch(`https://api.github.com/repos/${repo}/contents/${fileName}`,{
method:"PUT",
headers:{
"Authorization":"token "+token,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"New sushi order",
content:content
})
});

alert("Ordine inviato!");

}




