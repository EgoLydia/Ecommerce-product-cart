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
      <div class="cart-items d-flex align-items-center">
      <div class="image-box p-2">
        <img src="${product.imgSrc}" style="width: 100px;"/>
      </div>
      <div class="p-2 col-3 mt-4">
        <h1 class="title">${product.name}</h1>
        <h3 class="subtitle">${product.seller}</h3>
      </div>
      <div class="counter p-2 col-4">
      <div class="counter-btn">-</div>
      <div class="count">1</div>
      <div class="counter-btn">+</div>
      </div>
      <div class="prices p-5 col-2">
        <div class="amount">${product.price}</div>
      </div>
      <div class="col-2 p-4">
        <span class="close"><i class="bi bi-trash3 fs-5 me-3"></i></span>
      </div>
    </div>       
     `
		});
		cartProducts.innerHTML = output.join('');
    document.querySelector('.checkout').classList.remove = 'hide'
  }else{
    cartProducts.innerHTML = `<p>Your cart is empty</p>`
    document.querySelector('.checkout').classList.add = 'hide'
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

const carty = document.querySelector('#main-record')

window.onload = () =>{
    let mainRecord = [
        {
          id: 0,
          name: "T-shirt 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/1 (1).jpg",
        },
        {
          id: 1,
          name: "Product 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/1 (6).jpg",
        },
        {
          id: 2,
          name: "T-shirt 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/1 (2).jpg",
        },
        {
          id: 3,
          name: "Product 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/1 (4).jpg",
        },
        {
          id: 4,
          name: "T-shirt 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/01.jpg",
        },
        {
          id: 5,
          name: "Product 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/02.jpg",
        },
        {
          id: 6,
          name: "T-shirt 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/06.jpg",
        },
        {
          id: 7,
          name: "Product 1",
          price: 29.99,
          seller: "Amazon Stores",
          imgSrc: "./assets/product-05.jpg",
        },
        
    ]

mainRecord.forEach(function (productInCart) {
  carty.innerHTML += `<div class="cart-items d-flex">
    <div class="image-box p-2">
      <img style = "width: 100px;"src="${productInCart.imgSrc}"/>
    </div>
    <div class="p-2 col-3 mt-4">
      <h1 class="title">T-shirt 1</h1>
      <h3 class="subtitle">${productInCart.name}</h3>
    </div>
    <div class="counter p-2 col-4">
      <div class="counter-btn">-</div>
      <div class="count">1</div>
      <div class="counter-btn">+</div>
    </div>
    <div class="prices p-5 col-2">
      <div class="amount text-center">${productInCart.price}</div>
    </div>
    <div class="col-2 p-4">
      <span class="close"><img src="./images/th.jpg" style="width: 20px;"></span>
    </div>
    </div>`
})
let close = document.querySelectorAll('.close')

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener('click', (e) => {
      const row = close[i].parentNode.parentNode
      row.parentNode.removeChild(row)
      const indexToBeRemoved = mainRecord.findIndex((productInCart, index) => index === i)
      mainRecord.splice(indexToBeRemoved, 1)
      console.log(mainRecord)
  })
}

}