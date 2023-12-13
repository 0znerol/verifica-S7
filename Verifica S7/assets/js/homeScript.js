let i = 0;
let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MTUxMWMwNTgzNTAwMTg1MjJjOGUiLCJpYXQiOjE3MDIzNzA0MzgsImV4cCI6MTcwMzU4MDAzOH0.EAlwblfOu3EJHmte69boiGQVh5QihCpdhi5yHemjp5c";
let uri = "https://striveschool-api.herokuapp.com/api/product";
// class product {
//   constructor(_name, _description, _brand, _imageUrl, _price) {
//     this.name = _name;
//     this.description = _description;
//     this.brand = _brand;
//     this.imageUrl = _imageUrl;
//     this.price = _price;
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  // let delBtn = document.querySelector("button.btn-secondary");
  // let nameInput = document.querySelector("#prodName");
  // let descInput = document.querySelector("#prodDesc");
  // let brandInput = document.querySelector("#brand");
  // let imgInput = document.querySelector("#imgUrl");
  // let priceInput = document.querySelector("#price");
  let cardDiv = document.querySelector("div.container.row.d-flex");
  let submitBtn = document.querySelector("#signInBtn");
  let userName = document.querySelector("#userName");
  let password = document.querySelector("#password");
  let wrongpass = document.querySelector("form p");
  console.log(wrongpass);
  submitBtn.addEventListener("click", () => {
    console.dir(userName.value);
    console.dir(password.value);
    if (userName.value == "admin" && password.value == "admin") {
      console.log("correct");
      window.location.href = "backoffice.html";
    } else {
      wrongpass.innerHTML = "wrong";
    }
  });
  get(uri, cardDiv);

  // postBtn.addEventListener("click", () => {
  //   let newProd = new product(
  //     nameInput.value,
  //     descInput.value,
  //     brandInput.value,
  //     imgInput.value,
  //     priceInput.value
  //   );
  //   post(newProd, uri);
  // });

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

// function post(data, uri) {
//   fetch(`${uri}`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       Authorization: `bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       location.reload();
//     })
//     .catch((error) => console.log(error));
// }

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
            <div class="card my-1 bg-dark-subtle shadow-lg m-auto text-start" style="width: 18rem; height: 516px">
              <img src="${json.imageUrl}" class="card-img-top my-2 shadow m-auto" alt="..." style="width: 17em; height: 17em">
                <div class="card-body row">
                  <div class="col">
                    <h5 class="card-title">${json.name}</h5>
                  </div>
                  <div class="col">
                  <p class="card-title text-end">${json.brand}</p>
                </div>
                  <p class="card-text">${cutDesc}</p>
                  <p class="card-text">${json.price}€</p>
                  <a href="dettaglio.html" class="btn btn-primary dett shadow">Read More</a>
                </div>
            </div>
          </div>
  `;
  let readMoarBtn = document.querySelectorAll(".dett");
  readMoarBtn.forEach((element) => {
    element.addEventListener("click", (event) => {
      let targetid = event.target.parentNode.parentNode.parentNode.id;
      console.log(targetid);
      localStorage.setItem("detId", targetid);
      console.log(localStorage.getItem("detId"));
    });
  });
  i++;
}
