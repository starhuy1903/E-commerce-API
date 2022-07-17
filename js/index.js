let prodsList = [];
let cart = [];

const getEle = (id) => document.getElementById(id);

const renderProductsList = (data) => {
  let contentHTML = "";

  for (let i = 0; i < data.length; i++) {
    contentHTML += ` <div class="col-lg-3 col-md-6 col-sm-6">
            <figure class="card card-product-grid">
              <div class="img-wrap">
                <img src="${data[i].img}" alt="" style="width: 100%" />
              </div>
              <figcaption class="info-wrap border-top p-2">
                <div class="price-wrap">
                  <span id="price">$${data[i].price}</span>
                  
                </div>
                <div class="name-wrap">
                    <span id="name">${data[i].name}</span>
                </div>
                <p class="description mb-2">
                  ${data[i].desc}
                </p>
                <button class="btn btn-primary mb-1" onClick="addToCart(${data[i].id})">Add to cart</button>
              </figcaption>
            </figure>
          </div>`;
  }
  getEle("product-list").innerHTML = contentHTML;
};

const getProductsList = async () => {
  let response = await fetch(
    "https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones",
    { method: "GET" }
  );
  let prods = await response.json();

  if (prods) {
    for (let i = 0; i < prods.length; i++) {
      let newProds = new Product(
        prods[i].id,
        prods[i].name,
        prods[i].price,
        prods[i].screen,
        prods[i].backCamera,
        prods[i].frontCamera,
        prods[i].img,
        prods[i].desc,
        prods[i].type
      );
      prodsList.push(newProds);
    }
    // console.log(prodsList);
    renderProductsList(prodsList);
  }
};

getProductsList();

const filterBrand = () => {
  const select = getEle("filter-brand");
  if (select.selectedIndex !== 0) {
    const brand = select.options[select.selectedIndex].value;

    const brandProduct = prodsList.filter((ele) => ele.type === brand);
    renderProductsList(brandProduct);
  } else {
    renderProductsList(prodsList);
  }
};

const findProductById = (id) => {
  return prodsList.find((ele) => ele.id === id);
};

const addToCart = (id) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      cart[i].quantity++;
      return;
    }
  }

  const newCartProds = findProductById(id);
  cart.push({ product: newCartProds, quantity: 1 });
  saveCartToLocalStorage();
};

const hideProductsList = () => {};

const findItemByIdInCart = (id) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      return cart[i];
    }
  }
  return null;
};

const increItem = (id) => {
  cartItem = findItemByIdInCart(id);
  if (cartItem) {
    cartItem.quantity++;
    saveCartToLocalStorage();
    renderCart();
  }
};

const decreItem = (id) => {
  cartItem = findItemByIdInCart(id);
  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) removeItemInCart(id);
    saveCartToLocalStorage();
    renderCart();
  }
};

const removeItemInCart = (id) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      cart.splice(i, 1);
      saveCartToLocalStorage();
      renderCart();
      return;
    }
  }
};

const purchaseCart = () => {
  cart = [];
  saveCartToLocalStorage();
  getEle("cart").style.display = "none";
  alert("Your order was successfully");
};

const clearCart = () => {
  cart = [];
  saveCartToLocalStorage();
  getEle("cart").style.display = "none";
  alert("Your cart was empty");
};

const renderCart = () => {
  let totalPrice = 0;
  getEle("cart").style.display = "block";

  renderHTML = `
                  <h5 class="mb-3">
                  <button href="#!" class="text-body" style = "border: none; background: transparent;" onclick="hideShoppingCart()">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                  </button>
                  </h5>
                
                <hr> 
                <div>
        <p class="mb-1">Shopping cart</p>    
              <p class="mb-4"> You have ${cart.length} items in your cart</p>     
      </div>`;

  for (let i = 0; i < cart.length; i++) {
    curProduct = cart[i].product;
    totalPrice += +cart[i].product.price * cart[i].quantity;

    renderHTML += `
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="${curProduct.img}"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5>${curProduct.name}</h5>
                          <p class="small mb-0">${curProduct.desc}</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                      
                        <div class="wrapper fw-normal mb-0" style="width: 50px;">
                        <button class="minus" id="minus" onclick="decreItem(${curProduct.id})">-</button>
    <span class="num">${cart[i].quantity}</span>
    <button class="plus" id="plus" onclick="increItem(${curProduct.id})">+</button>
                          
                        </div>
                        <div style="width: 80px;">
                          <h5 class="mb-0">$${curProduct.price}</h5>
                        </div>
                        <button onclick="removeItemInCart(${curProduct.id})"  href="#!" style="color: #cecece; border: none; background: transparent;"><i class="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </div>
                </div>`;
  }

  renderHTML += `
    <hr>
    <div class="d-flex justify-content-between mb-4">
      <p class="mb-2 fs-3 fw-semibold">Total</p>
      <p class="mb-2 fs-3 fw-semibold">$${totalPrice}</p>
    </div>
    <div class="d-flex justify-content-end mb-4">
      <button onclick="purchaseCart()" class="btn btn-primary ">Purchase</button>
      <button onclick="clearCart()" class="btn btn-secondary mx-2">Clear cart</button>
    </div>
  `;
  getEle("productList").innerHTML = renderHTML;
};

const hideShoppingCart = () => {
  getEle("cart").style.display = "none";
};

const saveCartToLocalStorage = () => {
  let cartListJSON = JSON.stringify(cart);
  console.log(cartListJSON);
  localStorage.setItem("cart", cartListJSON);
};

const getCartFromLocalStorage = () => {
  let cartListJSON = JSON.parse(localStorage.getItem("cart"));

  if (!cartListJSON) return;
  cart = cartListJSON;
};

getCartFromLocalStorage();
