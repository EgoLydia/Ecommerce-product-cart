const productParent = document.querySelector(".products");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];
const cartProducts = document.querySelector(".cart-products");

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
          <div class="product-title">
            <p class="m-0">${product.name}</p>
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

const productInCart = [];

function addToCart(id) {
  if (productInCart.some((productItem) => productItem.id === id)) {
    alert("already exits");
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
  }
  updateCart();
}

function updateCart() {
  increment();
  renderCartItems();
  addEvent();
}

const renderCartItems = function () {
  if (productInCart.length > 0) {
    let output = productInCart.map((product) => {
      return `
      <div class="cart-items d-flex align-items-center" id="${product.id}">
      <div class="image-box p-2">
        <img src="${product.imgSrc}" style="width: 100px;"/>
      </div>
      <div class="p-2 col-3 mt-4">
        <h1 class="title">${product.name}</h1>
        <h3 class="subtitle">${product.seller}</h3>
      </div>
      <div class="counter p-2 col-4">
        <div class="counter-btn minus">-</div>
        <div class="unitQuantity">${product.unitQuantity}</div>
        <div class="counter-btn plus">+</div>
      </div>
      <div class="prices p-5 col-2">
        <div class="amount">${product.price}</div>
      </div>
      <div class="col-2 p-4">
        <span class="close"><i class="bi bi-trash3 fs-5 me-3"></i></span>
      </div>
    </div>       
     `;
    });
    cartProducts.innerHTML = output.join("");
  } else {
    cartProducts.innerHTML = `<p>Your cart is empty</p>`;
  }
};

let itemNumber = document.getElementById("item-number");
let count = 0;
function increment() {
  count = count + 1;
  itemNumber.innerText = count;
}

function addEvent() {
  const plus = document.querySelectorAll(".plus");

  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (e) => {
      let parent = plus[i].parentNode;
      let number = parent.children[1].innerText;
      parent.children[1].innerText = parseInt(number) + 1;
      let id = parseInt(parent.parentNode.getAttribute("id"));
      let index = productInCart.findIndex((product) => product.id === id);
      if (index > -1) {
        productInCart[index].unitQuantity += 1;
      }
      let subtotal = document.getElementById("subtotal");
      let total = subtotal.innerText;
      let productPrice = parent.parentNode.children[3].children[0].innerText;
      let newTotal = parseFloat(total) + parseFloat(productPrice);
      subtotal.innerText = newTotal.toFixed(2);
    });
  }

  const minus = document.querySelectorAll(".minus");
  for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener("click", (e) => {
      let parent = minus[i].parentNode;
      let number = parent.children[1].innerText;
      if (number > 1) {
        parent.children[1].innerText = parseInt(number) - 1;
        let id = parseInt(parent.parentNode.getAttribute("id"));
        let index = productInCart.findIndex((product) => product.id === id);
        if (index > -1) {
          productInCart[index].unitQuantity -= 1;
        }
        let subtotal = document.getElementById("subtotal");
        let total = subtotal.innerText;
        let productPrice = parent.parentNode.children[3].children[0].innerText;
        let newTotal = parseFloat(total) - parseFloat(productPrice);
        subtotal.innerText = newTotal.toFixed(2);
      }
    });
  }

  const close = document.querySelectorAll('.close')
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', (e) => {
            const row = close[i].parentNode.parentNode;
            row.parentNode.removeChild(row);
            const indexToBeRemoved = productInCart.findIndex((product, index) => index === i);
            productInCart.splice(indexToBeRemoved, 1);
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
