let cart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

const productParent = document.querySelector(".products");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];
let cartProducts = document.querySelector(".cart-products");

function renderProducts() {
  products.forEach((product) => {
    productParent.innerHTML += `
      <div
        class="col-md-3 col-sm-6 product "
      >
        <div class="product-img align-items-center">
          <img class="img-fluid" src="${product.imgSrc}" alt="" />
          <div class="product-actions d-flex align-items-center">
            <div class="product-wishlist text-center">
              <i class="bi bi-heart"></i>
            </div>
            <div class="product-quick-view text-center">
              <i class="bi bi-eye-fill"></i>
            </div>
            <div class="product-cart text-center">
              <i class="bi bi-search"></i>
            </div>
          </div>
        </div>
        <div class="product-info text-center">
          <div class="product-title ">
            <p class="mx-0 mb-0 mt-3">${product.name}</p>
          </div>
          <div class="product-seller">
            <p class="m-0"> ${product.seller}</p>
          </div>
          <div class="product-price-cart mt-2">
            <div class="product-price">
              <p class="m-0"><small>$</small>${product.price}</p>
            </div>
            <div
              class="product-cartt d-flex align-items-center justify-content-center"
            onclick="addToCart(${product.id})" >
              <i class="bi bi-cart-plus fs-5 me-2"></i>
                <p class="m-0">ADD TO CART</p>
            </div>
          </div>
        </div>
        </div>
          `;
  });
}

renderProducts();

let productInCart = [];

function load() {
  cart.forEach((productItem) => {
    let subtotal = document.getElementById("subtotal");
    let total = subtotal.innerText;
    let newTotal =
      parseFloat(total) +
      productItem.unitQuantity * parseFloat(productItem.price);
    subtotal.innerText = newTotal.toFixed(2);
    productInCart.push(productItem);
    increment(productItem.unitQuantity);
  });

  updateCart();
}

function addToCart(id) {
  if (productInCart.some((productItem) => productItem.id === id)) {
    let index = productInCart.findIndex((product) => product.id === id);
    if (index > -1) {
      productInCart[index].unitQuantity += 1;
      let subtotal = document.getElementById("subtotal");
      let total = subtotal.innerText;
      let productPrice = productInCart[index].price;
      let newTotal = parseFloat(total) + parseFloat(productPrice);
      subtotal.innerText = newTotal.toFixed(2);
      increment(1);
      updateCart();
      save();
    }
  } else {
    const productItem = products.find((product) => product.id === id);
    let subtotal = document.getElementById("subtotal");
    let total = subtotal.innerText;
    let newTotal = parseFloat(total) + parseFloat(productItem.price);
    subtotal.innerText = newTotal.toFixed(2);
    productInCart.push({
      ...productItem,
      unitQuantity: 1,
    });
    increment(1);
    updateCart();
    save();
  }
}

function save() {
  localStorage.setItem("shopping-cart", JSON.stringify(productInCart));
}

function updateCart() {
  renderCartItems();
  addEvent();
}

const renderCartItems = function () {
  if (productInCart.length > 0) {
    let output = productInCart.map((product) => {
      return `
      <div class="cart-items d-flex justify-content-between align-items-center" id="${product.id}">
      <div col-3>
        <img src="${product.imgSrc}" style="width: 100px;"/>
      </div>
      <div class="mt-4 col-2">
        <h1 class="title">${product.name}</h1>
        <h3 class="subtitle">${product.seller}</h3>
      </div>
      <div class="counter col-2">
        <div class="counter-btn minus me-1">-</div>
        <div class="unitQuantity">${product.unitQuantity}</div>
        <div class="counter-btn plus ms-1">+</div>
      </div>
      <div class="prices col-2 text-center ">
        <div class="amount">${product.price}</div>
      </div>
      <div class="col-2">
        <span class="delete"><i class="bi bi-trash3 fs-5 me-5"></i></span>
      </div>
    </div>       
     `;
    });
    cartProducts.innerHTML = output.join("");
  }
};

let itemNumber = document.getElementById("item-number");
let count = 0;
function increment(unitQuantity) {
  count += parseInt(unitQuantity);
  itemNumber.innerText = count;
}

function decrement(unitQuantity) {
  count -= unitQuantity;

  if (count == 0) {
    itemNumber.innerText = "";
  } else {
    itemNumber.innerText = count;
  }
}

function addEvent() {
  const plus = document.querySelectorAll(".plus");

  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (e) => {
      let parent = plus[i].parentNode;
      let number = parent.children[1].innerText;
      parent.children[1].innerHTML = parseInt(number) + 1;
      increment(1);
      let id = parseInt(parent.parentNode.getAttribute("id"));
      let index = productInCart.findIndex((product) => product.id === id);
      if (index > -1) {
        productInCart[index].unitQuantity += 1;
        let subtotal = document.getElementById("subtotal");
        let total = subtotal.innerText;
        let productPrice = parent.parentNode.children[3].children[0].innerText;
        let newTotal = parseFloat(total) + parseFloat(productPrice);
        subtotal.innerText = newTotal.toFixed(2);
        save();
      }
    });
  }

  const minus = document.querySelectorAll(".minus");
  for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener("click", (e) => {
      let parent = minus[i].parentNode;
      let number = parseInt(parent.children[1].innerText);
      if (number > 1) {
        parent.children[1].innerText = parseInt(number) - 1;
        itemNumber.innerHTML = parent.children[1].innerText;
        decrement(1);
        let id = parseInt(parent.parentNode.getAttribute("id"));
        let index = productInCart.findIndex((product) => product.id === id);
        if (index > -1) {
          productInCart[index].unitQuantity -= 1;
          let subtotal = document.getElementById("subtotal");
          let total = subtotal.innerText;
          let productPrice =
            parent.parentNode.children[3].children[0].innerText;
          let newTotal = parseFloat(total) - parseFloat(productPrice);
          subtotal.innerText = newTotal.toFixed(2);
          save();
        }
      }
    });
  }

  const deleteItem = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (e) => {
      const row = deleteItem[i].parentNode.parentNode;
      row.parentNode.removeChild(row);
      let id = parseInt(row.getAttribute("id"));
      let index = productInCart.findIndex((product) => product.id === id);
      if (index > -1) {
        let unitQuantity = productInCart[index].unitQuantity;
        productInCart.splice(index, 1);
        decrement(unitQuantity);
        let subtotal = document.getElementById("subtotal");
        let total = subtotal.innerText;
        let productPrice = row.children[3].children[0].innerText;
        let newTotal =
          parseFloat(total) - unitQuantity * parseFloat(productPrice);
        subtotal.innerText = newTotal.toFixed(2);
        if (newTotal < 1) {
          subtotal.innerHTML = `<div>0</div>`;

          cartProducts.innerHTML = `<div class="text-center mt-3">Your cart is empty!</div>`;
        } else {
          subtotal.innerText = newTotal.toFixed(2);
        }
        save();
      }
    });
  }
}

modalBtn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

load();
function checkOut() {
  if (productInCart.length == 0) {
    alert("No Items were added to cart");
  }
  else{ alert("Success!");
    productInCart = [];
    cartProducts.innerHTML = "";
    let subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = `<div>0</div>`;
    itemNumber.innerText = "";
    count = 0;
  }
  clear()
  save()
  updateCart();
}

function clear() {
  localStorage.setItem("shopping-cart", []);
}
console.log(clear);
