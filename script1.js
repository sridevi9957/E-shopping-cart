const products = [
  {
    id: 1,
    name: "Royal Chair",
    price: 99,
    image: "chair.png",
    slug: "wooden-chair"
  },
  {
    id: 2,
    name: "Bar Table",
    price: 199,
    image: "table.png",
    slug: "study-table"
  },
  {
    id: 3,
    name: "Sofa Set",
    price: 150,
    image: "sofa.png",
    slug: "sofa-set"
  },
  {
    id: 4,
    name: "Dining Table",
    price: 699,
    image: "dining.png",
    slug: "dining-table"
  },
  {
    id: 5,
    name: "dressing table",
    price: 100,
    image: "dressing.png",
    slug: "dressing-table"
  },
  {
    id: 6,
    name: "Parsons chair",
    price: 69,
    image: "chair2.png",
    slug: "chair"
  },
  {
    id: 7,
    name: "Console Table",
    price: 129,
    image: "flower.png",
    slug: "flower-table"
  },
  {
    id: 8,
    name: "Cupboard",
    price: 599,
    image: "cuboard.jpg",
    slug: "storage-cuboard"
  }
];

let cart = [];
  function searchProducts() {
    let query=document.getElementById("search").value.toLowerCase();

    let filtered=products.filter((product)=>{return product.name.toLowerCase().includes(query)});
    displayProducts(filtered);
  }

function displayProducts(filtered = products) {
  let productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  filtered.forEach((product) => {
    let productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `
      <img class="img1" src="${product.image}" alt="" />
      <p class="p1">${product.name}</p>
      <p class="p2">${product.price}</p>
      <button class="add" onclick="addToCart(${product.id})">Add to cart</button>
    `;
    productDiv.appendChild(productContainer);
  });
}

function addToCart(id) {
  let selectedProduct = products.find((product) => product.id === id);
  if (!selectedProduct) return;

  let existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }
  showToast();
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  let cartDiv = document.getElementById("cart-c");
  cartDiv.innerHTML = "";

  let totalAmount = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is Empty</p>";
    document.getElementById("total").textContent = "Total:$0";
    localStorage.removeItem("cart");
    returns;
  }

  cart.forEach((item, index) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-p");

    totalAmount += item.price * item.quantity;

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <p>${item.name} - ${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" onchange="quantityUpdate(${index},this.value)"/>
      <button onclick="remove(${index})">Remove</button>
    `;

    cartDiv.appendChild(cartItem);
  });

  document.getElementById("total").textContent = `Total:${totalAmount}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}
function remove(index){
  cart.splice(index, 1);
  updateCart();

}

window.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
  updateCart();
});

function quantityUpdate(index, quantity) {
  let newQuantity = Number(quantity);
  if (Number.isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1;
  }

  cart[index].quantity = newQuantity;
  updateCart();
}
displayProducts();

function toggleCart() {
  const cartContainer = document.querySelector(".cart");
  const toggleBtn=document.getElementById("cart-toggle-btn");
  cartContainer.classList.toggle("open");
  if(cart.classList.contains("open")){
    toggleBtn.textContent="❌";
  } 
  else{
    toggleBtn.textContent="🛒";
  }
}
  function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() =>{
      toast.classList.remove("show");   
     },2000)
  }

function orderProducts() {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add products before ordering.");
    return;
  }
  
  let totalAmount = 0;
  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });
  
  let orderConfirm = confirm(`Your order total is $${totalAmount}. Proceed with order?`);
  
  if (orderConfirm) {
    alert("Order placed successfully! Thank you for shopping with us.");
    cart = [];
    localStorage.removeItem("cart");
    updateCart();
  }
}

 