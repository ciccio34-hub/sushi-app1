let cart = []

function add(nome){

let trovato = cart.find(p=>p.nome==nome)

if(trovato){

trovato.qty++

}else{

cart.push({
nome:nome,
qty:1
})

}

render()

}

function plus(i){

cart[i].qty++

render()

}

function minus(i){

cart[i].qty--

if(cart[i].qty<=0){

cart.splice(i,1)

}

render()

}

function render(){

let div = document.getElementById("cart")

div.innerHTML=""

cart.forEach((p,i)=>{

div.innerHTML+=`

<div>

${p.nome}

<button onclick="minus(${i})">-</button>

${p.qty}

<button onclick="plus(${i})">+</button>

</div>

`

})

}

function inviaOrdine(){

let ordini = JSON.parse(localStorage.getItem("ordini")) || []

ordini.push({

piatti: cart.map(p=>({

nome:p.nome,

qty:p.qty,

stato:"preparazione"

}))

})

localStorage.setItem("ordini",JSON.stringify(ordini))

cart=[]

render()

}

function stato(){

let ordini = JSON.parse(localStorage.getItem("ordini")) || []

let div = document.getElementById("stato")

div.innerHTML=""

ordini.forEach(o=>{

o.piatti.forEach(p=>{

div.innerHTML+=`<div>${p.nome} - ${p.stato}</div>`

})

})

}

setInterval(stato,1000)

