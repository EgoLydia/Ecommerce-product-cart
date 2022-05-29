const productParent = document.querySelector('.products')
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
let span = document.getElementsByClassName("close")[0];
const cartProducts = document.querySelector('.cart-products')

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

const productInCart = []

function addToCart(id){
  if(productInCart.some((productItem) => productItem.id === id)){
    alert('already exits');
  }else{
    const productItem = products.find((product) => product.id === id);
    productInCart.push({
      ...productItem,
      unitQuantity:1
    })
    console.log(productInCart);
  }
  updateCart();
}

function updateCart(){
  renderCartItems()
  increment();
}

const renderCartItems = function () {
	if (productInCart.length > 0) {
		let output = productInCart.map(product => {
			return `
        <div>${product.name}</div>
        `
		});
		cartProducts.innerHTML = output.join('');
  }else{
    cartProducts.innerHTML = `<p>Your cart is empty</p>`
  }
}

let itemNumber = document.getElementById("item-number");
let count = 0;
  
function increment() {
    count = count + 1;
    itemNumber.innerText = count;
}

modalBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}