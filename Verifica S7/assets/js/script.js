let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MTUxMWMwNTgzNTAwMTg1MjJjOGUiLCJpYXQiOjE3MDIzNzA0MzgsImV4cCI6MTcwMzU4MDAzOH0.EAlwblfOu3EJHmte69boiGQVh5QihCpdhi5yHemjp5c";
let uri = "https://striveschool-api.herokuapp.com/api/product";
let prodArr = [];
class product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let postBtn = document.querySelector("button.btn-primary");
  let delBtn = document.querySelector("button.btn-secondary");

  let nameInput = document.querySelector("#prodName");
  let descInput = document.querySelector("#prodDesc");
  let brandInput = document.querySelector("#brand");
  let imgInput = document.querySelector("#imgUrl");
  let priceInput = document.querySelector("#price");
  get(uri);
  postBtn.addEventListener("click", () => {
    console.log(nameInput.value);
    let newProd = new product(
      nameInput.value,
      descInput.value,
      brandInput.value,
      imgInput.value,
      priceInput.value
    );
    post(newProd, uri);
  });
  delBtn.addEventListener("click", () => {
    del(uri);
    console.log("sotcaz");
  });
});

function get(uri) {
  fetch(uri, { method: "GET", headers: { Authorization: `bearer ${apiKey}` } })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function post(data, uri) {
  fetch(uri, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
}
function del(uri) {
  fetch(`${uri}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json)
    .catch((error) => console.log(error));
}
