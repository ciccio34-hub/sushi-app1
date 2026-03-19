
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getFirestore,collection,addDoc,onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig={
apiKey:"AIzaSyCW2MF4P8D9lYtQML-ZwZPbjF-MDIOHIC4",
authDomain:"sushi-web-54e9b.firebaseapp.com",
projectId:"sushi-web-54e9b"
}

const app=initializeApp(firebaseConfig)
const db=getFirestore(app)

let cart={},total=0,lastReady=0

const images={
"Sashimi":"https://images.unsplash.com/photo-1617196038435-7c9c0b9a0f2e",
"Nigiri":"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
"Roll con alga e Philadelphia":"https://images.unsplash.com/photo-1553621042-f6e147245754",
"Roll senza alga senza Philadelphia":"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"
}

const menuData=[
{section:"Bevande",items:[{name:"Acqua naturale",price:1},{name:"Acqua frizzante",price:1}]},
{section:"Antipasti",items:[
{name:"Nuvole di drago",price:5},
{name:"Involtini primavera",price:4},
{name:"Gyoza",price:4},
{name:"Ravioli di gambero",price:5},
{name:"Spaghetti di riso con verdure",price:5}
]},
{section:"Sashimi",items:[
{name:"Sashimi salmone",price:7},
{name:"Sashimi tonno",price:7}
]},
{section:"Nigiri",items:[
{name:"Nigiri salmone",price:5},
{name:"Nigiri tonno",price:5}
]},
{section:"Roll con alga e Philadelphia",items:[
{name:"Roll salmone",price:6},
{name:"Roll tonno",price:6},
{name:"Roll gambero",price:6}
]},
{section:"Roll senza alga senza Philadelphia",items:[
{name:"Roll salmone",price:5},
{name:"Roll tonno",price:5},
{name:"Roll gambero",price:5}
]}
]

function renderMenu(){
let html=""
menuData.forEach(s=>{
html+=`<div class="section">
<div class="section-title">
${images[s.section]?`<img src="${images[s.section]}">`:""}
<h2>${s.section}</h2>
</div>`
s.items.forEach(i=>{
html+=`<div class="item">
<span>${i.name} €${i.price}</span>
<div>
<button onclick="addItem('${i.name}',${i.price})">+</button>
<button onclick="removeItem('${i.name}',${i.price})">-</button>
</div>
</div>`
})
html+="</div>"
})
document.getElementById("menu").innerHTML=html
}

window.addItem=(n,p)=>{
if(!cart[n])cart[n]={q:0,p}
cart[n].q++
total+=p
updateCart()
}

window.removeItem=(n,p)=>{
if(!cart[n])return
cart[n].q--
total-=p
if(cart[n].q<=0)delete cart[n]
updateCart()
}

function updateCart(){
let h=""
Object.keys(cart).forEach(n=>h+=`${n} x${cart[n].q}<br>`)
document.getElementById("cart").innerHTML=h
document.getElementById("total").innerText="Totale €"+total
}

window.sendOrder=async()=>{
if(Object.keys(cart).length==0)return alert("Carrello vuoto")

let items=[]
Object.keys(cart).forEach(n=>{
for(let i=0;i<cart[n].q;i++){
items.push({name:n,status:"prep"})
}
})

await addDoc(collection(db,"orders"),{items,time:Date.now()})

cart={}
total=0
updateCart()
}

onSnapshot(collection(db,"orders"),snap=>{
let orders=[]
let ready=0

snap.forEach(d=>{
let data=d.data()
orders.push(data)
data.items.forEach(i=>{
if(i.status=="ready")ready++
})
})

if(ready>lastReady){
document.getElementById("gong").play()
}

lastReady=ready

let html=""
orders.forEach(o=>{
html+="<div>"
o.items.forEach(i=>{
html+=`<p>${i.name} - ${
i.status=="ready"
?'<span class="status-ready">Pronto</span>'
:'<span class="status-prep">In preparazione</span>'
}</p>`
})
html+="</div>"
})

document.getElementById("orders").innerHTML=html
})

renderMenu()
