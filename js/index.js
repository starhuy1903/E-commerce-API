let prodsList = [];

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
                <button class="btn btn-primary mb-1">Add to cart</button>
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
    prodsList = [...prods];
    renderProductsList(prodsList);
    console.log(prods);
  }
};

getProductsList();
