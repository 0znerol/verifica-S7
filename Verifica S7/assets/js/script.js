let i = 0;
let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MTUxMWMwNTgzNTAwMTg1MjJjOGUiLCJpYXQiOjE3MDIzNzA0MzgsImV4cCI6MTcwMzU4MDAzOH0.EAlwblfOu3EJHmte69boiGQVh5QihCpdhi5yHemjp5c";
let uri = "https://striveschool-api.herokuapp.com/api/product";
class product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let postBtn = document.querySelector("button.btn-dark.add");
  let delBtn = document.querySelector("button.btn-secondary");
  let nameInput = document.querySelector("#prodName");
  let descInput = document.querySelector("#prodDesc");
  let brandInput = document.querySelector("#brand");
  let imgInput = document.querySelector("#imgUrl");
  let priceInput = document.querySelector("#price");
  let cardDiv = document.querySelector("div.container.row.d-flex");
  console.log(postBtn);
  console.log(cardDiv);
  get(uri, cardDiv);

  postBtn.addEventListener("click", () => {
    let newProd = new product(
      nameInput.value,
      descInput.value,
      brandInput.value,
      imgInput.value,
      priceInput.value
    );
    post(newProd, uri);
  });

  // delCardBtn.forEach((element) => {
  //   console.log(element);
  //   element.addEventListener("click", (event) => {
  //     let delCard = event.target.parentNode.id;
  //     console.log(delCard);
  //     del(uri, delCard);
  //   });
  // });
  // modCardBtn.forEach((element) => {
  //   element.addEventListener("click", (event) => {
  //     console.log(event.target.parentNode.attributes.id);
  //   });
  // });

  delBtn.addEventListener("click", () => {
    del(uri, idArr.pop());
    console.log("deleted last");
  });
});
function get(uri, cardDiv) {
  fetch(uri, { method: "GET", headers: { Authorization: `bearer ${apiKey}` } })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      json.forEach((element) => {
        addCard(element, cardDiv);
      });
    });
}

function post(data, uri) {
  fetch(`${uri}`, {
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
      location.reload();
    })
    .catch((error) => console.log(error));
}
function del(uri, id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json;
      location.reload();
    })
    .catch((error) => console.log(error));
}

function addCard(json, cardDiv) {
  console.log("card" + json.name);
  let cutDesc = json.description;

  if (json.description.length > 80) {
    console.log(cutDesc);
    cutDesc = cutDesc.slice(0, 80) + "...";
    console.log(cutDesc);
  }
  console.log(cardDiv);
  cardDiv.innerHTML += `
          <div class="col text-center" id="${json._id}" value="${i}">
          <a href="#" class="btn btn-danger"><i class="bi bi-trash"></i></a>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="bi bi-pencil"></i>
          </button>
            <div class="card my-1 m-auto text-start" style="width: 18rem; height: 516px">


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
                  <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
          </div>
  `;
  let delCardBtn = document.querySelectorAll("a.btn.btn-danger");
  let modCardBtn = document.querySelectorAll("button.btn.btn-primary");
  let modalBtn = document.querySelectorAll("button.btn.btn-success");
  let cards = document.querySelectorAll("div.col.text-center");
  let modalNameInput = document.querySelector("#modalprodName");
  let modalDescInput = document.querySelector("#modalprodDesc");
  let modalBrandInput = document.querySelector("#modalbrand");
  let modalImgInput = document.querySelector("#modalimgUrl");
  let modalPriceInput = document.querySelector("#modalprice");
  let id = "";
  console.log(modCardBtn);
  console.log(delCardBtn);
  console.log(modalBtn);
  console.log(cards);
  modalBtn.forEach((element) => {
    element.addEventListener("click", (event) => {
      console.log(event.target.parentNode.nodeName);
      if (event.target.parentNode.nodeName === "DIV") {
        id = event.target.parentNode.id;
      } else if (event.target.parentNode.nodeName === "BUTTON") {
        id = event.target.parentNode.parentNode.id;
      }
      let selectedCard = document.getElementById(id);
      let savedNameInput =
        selectedCard.childNodes[5].childNodes[3].childNodes[1].innerText;
      console.dir(selectedCard.childNodes[5].childNodes[3]);
      let savedBrandInput =
        selectedCard.childNodes[5].childNodes[3].childNodes[3].innerText;
      let savedDescInput =
        selectedCard.childNodes[5].childNodes[3].childNodes[5].innerText;

      let savedImgInput = selectedCard.childNodes[5].childNodes[1].currentSrc;
      console.log(savedImgInput);

      console.dir(savedImgInput);
      let savedPriceInput =
        selectedCard.childNodes[5].childNodes[3].childNodes[7].innerText;

      console.log(id);
      modalNameInput.value = savedNameInput;
      modalDescInput.value = savedDescInput;
      modalBrandInput.value = savedBrandInput;
      modalImgInput.value = savedImgInput;
      modalPriceInput.value = savedPriceInput;
      let saveChangesBtn = document.querySelector("#saveChangesBtn");
      saveChangesBtn.addEventListener("click", () => {
        updateCard(
          id,
          modalNameInput.value,
          modalDescInput.value,
          modalBrandInput.value,
          modalImgInput.value,
          modalPriceInput.value
        );
      });
    });
  });
  delCardBtn.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardId = event.target.parentNode.id;
      console.log(cardId);
      del(uri, cardId);
    });
  });

  i++;
}
function updateCard(id, name, description, brand, imageUrl, price) {
  let updatedProd = new product(name, description, brand, imageUrl, price);

  fetch(`${uri}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProd),
    headers: {
      Authorization: `bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => console.log(error));
}
