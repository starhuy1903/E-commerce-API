const getProductsList = async () => {
  let response = await fetch(
    "https://62bdd5cfbac21839b60c0579.mockapi.io/api/phones",
    { method: "GET" }
  );
  let prods = await response.json();

  console.log(prods);
};

const renderProductsList = () => {};

getProductsList();
