let cart = {};
let total = 0;

function changeQty(name, price, amount) {
  if (!cart[name]) {
    cart[name] = { qty: 0, price: price };
  }

  cart[name].qty += amount;

  if (cart[name].qty < 0) {
    cart[name].qty = 0;
  }

  document.getElementById(name).innerText = cart[name].qty;
  updateCart();
}

function updateCart() {
  let cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";
  total = 0;

  for (let item in cart) {
    if (cart[item].qty > 0) {
      let itemTotal = cart[item].qty * cart[item].price;
      total += itemTotal;
      cartDiv.innerHTML += `<p>${item} x${cart[item].qty} = ${itemTotal}€</p>`;
    }
  }

  document.getElementById("total").innerText = total + "€";
}

function sendOrder() {
  alert("Ordine inviato!");
}
