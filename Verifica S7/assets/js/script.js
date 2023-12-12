let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MTUxMWMwNTgzNTAwMTg1MjJjOGUiLCJpYXQiOjE3MDIzNzA0MzgsImV4cCI6MTcwMzU4MDAzOH0.EAlwblfOu3EJHmte69boiGQVh5QihCpdhi5yHemjp5c";
let uri = "https://striveschool-api.herokuapp.com/api/product";
let idArr = [];
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
  let cardDiv = document.querySelector("div.container.row.d-flex");
  console.log(cardDiv);
  get(uri, cardDiv);
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
    console.log("deleted last");
  });
});

function get(uri, cardDiv) {
  fetch(uri, { method: "GET", headers: { Authorization: `bearer ${apiKey}` } })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      json.forEach((element) => {
        idArr.push(element._id);
        addCard(element, cardDiv);
      });
    });
  console.log(idArr);
}

function post(data, uri) {
  fetch(uri, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
function del(uri) {
  fetch(`${uri}/${idArr.pop()}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json)
    .catch((error) => console.log(error));
}

function addCard(json, cardDiv) {
  console.log("card" + json.name);
  let cutDesc = json.description;

  if (json.description.length > 50) {
    console.log(cutDesc);
    cutDesc = cutDesc.slice(0, 80) + "...";
    console.log(cutDesc);
  }
  console.log(cardDiv);
  cardDiv.innerHTML += `
          <div class="col align-self-center">
            <div class="card my-1" style="width: 18rem; height: 516px">
              <img src="${json.imageUrl}" class="card-img-top" alt="..." style="width: 286px; height: 286px">
                <div class="card-body row">
                  <div class="col">
                    <h5 class="card-title">${json.name}</h5>
            
                  </div>
                  <div class="col">
                  <p class="card-title text-end">${json.brand}</p>
            
                </div>
                  <p class="card-text">${cutDesc}</p>
                  <p class="card-text">${json.price}€</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
          </div>
  `;
}
