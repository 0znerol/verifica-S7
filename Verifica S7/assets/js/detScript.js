let i = 0;
let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MTUxMWMwNTgzNTAwMTg1MjJjOGUiLCJpYXQiOjE3MDIzNzA0MzgsImV4cCI6MTcwMzU4MDAzOH0.EAlwblfOu3EJHmte69boiGQVh5QihCpdhi5yHemjp5c";
let uri = "https://striveschool-api.herokuapp.com/api/product";
id =
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
    let cardDiv = document.querySelector("div.container.my-2.d-flex");
    let submitBtn = document.querySelector("#signInBtn");
    let userName = document.querySelector("#userName");
    let password = document.querySelector("#password");
    let wrongpass = document.querySelector("form p");
    let id = localStorage.getItem("detId");
    console.log(cardDiv);
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
    get(uri, cardDiv, id);

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
function get(uri, cardDiv, id) {
  fetch(`${uri}/${id}`, {
    method: "GET",
    headers: { Authorization: `bearer ${apiKey}` },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      addCard(json, cardDiv);
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
  let str =
    "aslkjaslkjaslkjalkjsdlkajsdlkjalksjdlakdjalkjdalksdjalksdjalkdjalkdjlaskdjalskdjalksdjaskldjaskldjalkdjaslkdjalkdj";
  console.log(str.length);
  console.log("card" + json.name);
  let desc = json.description;
  console.log(desc);
  let descLength = desc.length;

  console.log(descLength);
  let cutDesc1 = json.description.slice(0, 50);

  console.log(cutDesc1);

  console.log(cardDiv);
  cardDiv.innerHTML = `
          <div class="col-4">
            <img
              src="${json.imageUrl}"
              alt=""
              srcset=""
              style="height: 25em"
            />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col">
                <h1>${json.name}</h1>
              </div>
              <div class="col text-end"><h3 class="my-3">${json.brand}</h3></div>
            </div>
            <div class="row-5 p-3 h-100">
              <div class="col">
                <p class="d-block">${json.description}</p>
              </div>
            </div>
          </div> 
  `;
  i++;
}
