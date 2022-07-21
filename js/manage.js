// import Product from "../models/product.js";

const getEle = (id) => document.getElementById(id);

let prodsList = [];

const mapData = (data) => {
  if (data) {
    let list = [];
    for (let i = 0; i < data.length; i++) {
      let newProds = new Product(
        data[i].id,
        data[i].name,
        data[i].price,
        data[i].screen,
        data[i].backCamera,
        data[i].frontCamera,
        data[i].img,
        data[i].desc,
        data[i].type
      );
      list.push(newProds);
    }
    return list;
  }
};

const getProductsList = async () => {
  let response = await fetch(
    "https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones",
    { method: "GET" }
  );
  let prods = await response.json();

  prodsList = mapData(prods);

  renderProductsList(prodsList);
};
getProductsList();

function getProduct(e) {
  const id = e.target.parentElement.id;
  axios({
    url: `https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones/${id}`,
    method: "GET",
  })
    .then(function (res) {
      const prod = res.data;
      // Open form
      getEle("btnAddNewProduct").click();

      getEle("productId").value = prod.id;
      getEle("ProName").value = prod.name;
      getEle("ProType").value = prod.type;
      getEle("ProPrice").value = prod.price;
      getEle("ProScreen").value = prod.screen;
      getEle("ProBackCamera").value = prod.backCamera;
      getEle("ProFrontCamera").value = prod.frontCamera;
      getEle("ProImg").value = prod.img;
      getEle("ProDesc").value = prod.desc;

      getEle("btnUpdate").style.display = "block";
      getEle("btnSaveInfo").style.display = "none";
      getEle("btnDelete").style.display = "block";
    })
    .catch(function (err) {
      console.log(err);
    });
}

const deleteProduct = () => {
  const id = getEle("productId").value;
  // console.log(id);
  axios({
    url: `https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones/${id}`,
    method: "DELETE",
  })
    .then(() => {
      getProductsList();
      getEle("btnCloseModal").click();
    })
    .catch((err) => console.log(err));
};

const renderProductsList = (data) => {
  let contentHTML = "";

  for (let i = 0; i < data.length; i++) {
    contentHTML += ` 
          <tr id=${data[i].id} style="cursor: pointer">
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].type}</td>
            <td>${data[i].price}</td>
            <td>
                <img width="50px" src="${data[i].img} " alt="${data[i].name}"/>
            </td>
            <td>Screen ${data[i].screen} - BackCamera: ${
      data[i].backCamera
    } MP - FrontCamera: ${data[i].frontCamera} MP - ${data[i].desc}</td>
            `;
  }
  getEle("ProductListTable").innerHTML = contentHTML;
};

const updateProduct = () => {
  if (validateForm()) {
    let proId = getEle("productId").value;
    let proName = getEle("ProName").value;
    let proType = getEle("ProType").value;
    let proPrice = getEle("ProPrice").value;
    let proScreen = getEle("ProScreen").value;
    let proBackCam = getEle("ProBackCamera").value;
    let proFrontCam = getEle("ProFrontCamera").value;
    let proImg = getEle("ProImg").value;
    let proDesc = getEle("ProDesc").value;

    const product = new Product(
      proId,
      proName,
      proPrice,
      proScreen,
      proBackCam,
      proFrontCam,
      proImg,
      proDesc,
      proType
    );

    axios({
      url: `https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones/${proId}`,
      method: "PUT",
      data: product,
    })
      .then(() => {
        getProductsList();
        getEle("btnCloseModal").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const createProduct = () => {
  if (validateForm()) {
    let proName = getEle("ProName").value;
    let proType = getEle("ProType").value;
    let proPrice = getEle("ProPrice").value;
    let proScreen = getEle("ProScreen").value;
    let proBackCam = getEle("ProBackCamera").value;
    let proFrontCam = getEle("ProFrontCamera").value;
    let proImg = getEle("ProImg").value;
    let proDesc = getEle("ProDesc").value;

    let id = Math.round(Math.random() * 10000000);

    const product = new Product(
      id,
      proName,
      proPrice,
      proScreen,
      proBackCam,
      proFrontCam,
      proImg,
      proDesc,
      proType
    );

    axios({
      url: "https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones",
      method: "POST",
      data: product,
    })
      .then(() => {
        getProductsList();
        getEle("btnCloseModal").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const clearForm = () => {
  getEle("productId").value = "";
  getEle("ProName").value = "";
  getEle("ProType").value = "";
  getEle("ProPrice").value = "";
  getEle("ProScreen").value = "";
  getEle("ProBackCamera").value = "";
  getEle("ProFrontCamera").value = "";
  getEle("ProImg").value = "";
  getEle("ProDesc").value = "";

  getEle("btnUpdate").style.display = "none";
  getEle("btnSaveInfo").style.display = "block";
  getEle("btnDelete").style.display = "none";
};

const validateForm = () => {
  let isValid = true;

  let proName = getEle("ProName").value;
  let proType = getEle("ProType").value;
  let proPrice = getEle("ProPrice").value;
  let proScreen = getEle("ProScreen").value;
  let proBackCam = getEle("ProBackCamera").value;
  let proFrontCam = getEle("ProFrontCamera").value;
  let proImg = getEle("ProImg").value;
  let proDesc = getEle("ProDesc").value;

  isValid &= checkRequired(proName, "spanName");

  isValid &= checkRequired(proType, "spanType");

  isValid &= checkRequired(proPrice, "spanPrice");

  isValid &= checkRequired(proScreen, "spanScreen");

  // isValid &= checkRequired(proName, spanName);

  // isValid &= checkRequired(proName, spanName);

  isValid &= checkRequired(proImg, "spanImg");

  return isValid;
};

const checkRequired = (val, spanId) => {
  if (val.length > 0) {
    getEle(spanId).innerText = "";
    return true;
  }
  getEle(spanId).innerText = "* This field is required";
  return false;
};

// Event listener
getEle("ProductListTable").addEventListener("click", (e) => getProduct(e));
getEle("btnSaveInfo").addEventListener("click", createProduct);
getEle("btnUpdate").addEventListener("click", updateProduct);
getEle("btnCloseModal").addEventListener("click", clearForm);
getEle("btnDelete").addEventListener("click", deleteProduct);
