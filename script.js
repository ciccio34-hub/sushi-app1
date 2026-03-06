const menuData = [

"Acqua naturale",
"Acqua frizzante",

"Nuvole di drago",
"Involtini primavera",
"Gyoza",
"Ravioli di gambero",

"Sashimi salmone",
"Sashimi tonno",

"Nighiri salmone",
"Nighiri tonno",

"Roll salmone",
"Roll salmone mango",
"Roll salmone fragole",

"Roll tonno",
"Roll tonno mango",
"Roll tonno fragole",

"Roll gamberi",
"Roll gamberi mango",
"Roll gamberi fragole",

"Gelato"

];

let carrello = {};

function renderMenu(){

const menu = document.getElementById("menu");

if(!menu) return;

menuData.forEach(nome=>{

const div=document.createElement("div");

div.className="item";

div.innerHTML=`
${nome}

<div>

<button onclick="meno('${nome}')">-</button>

<span id="${nome}">0</span>

<button onclick="piu('${nome}')">+</button>

</div>
`;

menu.appendChild(div);

});

}

function piu(nome){

if(!carrello[nome]) carrello[nome]=0;

carrello[nome]++;

document.getElementById(nome).innerText=carrello[nome];

renderCart();

}

function meno(nome){

if(!carrello[nome]) return;

carrello[nome]--;

if(carrello[nome]<=0) delete carrello[nome];

document.getElementById(nome).innerText=carrello[nome]||0;

renderCart();

}

function renderCart(){

const cart=document.getElementById("cart");

if(!cart) return;

cart.innerHTML="";

for(const nome in carrello){

const div=document.createElement("div");

div.className="cart-item";

div.innerText=nome+" x"+carrello[nome];

cart.appendChild(div);

}

}

function inviaOrdine(){

alert("Ordine inviato (Firebase da collegare)");

carrello={};

location.reload();

}

renderMenu();


