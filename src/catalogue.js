localStorage.setItem("cart", "");
document.getElementById("categoryGatos").addEventListener("click", categoryChangeGatos);
document.getElementById("categoryPerros").addEventListener("click", categoryChangePerros);
document.getElementById("clearCart").addEventListener("click", clearCart);
document.getElementById("complete").addEventListener("click", buyComplete);

async function buyComplete() {
  const total = parseInt(localStorage.getItem("total"));
  if (total == 0) {
    swal(
      '',
      "Debe agregar productos al carrito para poder completar una compra",
      'warning'
    )
  } else {
    await swal(
      'Success',
      `
          Gracias ${localStorage
            .getItem("userName")
            .toUpperCase()} por comprar en Ding Dog, compro ${localStorage.getItem(
        "totalProducts"
      )} productos por un total de $ ${localStorage.getItem("total")}
          `,
      'success'
    );
    clearCart();
  }
}

function categoryChangePerros() {
  catalogueChange("perros");
}

function categoryChangeGatos() {
  catalogueChange("gatos");
}

async function addProductToCart(event) {
  if (String(localStorage.getItem("login")) != "true") {
    swal(
      '',
      'Debe logearse para porder agregar productos al carrito',
      'warning'
    )
  } else {
    const catalogue = await searchProducts(event.target.getAttribute("category"));
    const item = await catalogue['products'].find(
      (p) => p.id === parseInt(event.target.getAttribute("productId"))
    );
    showProductInCart(item);
    let x = localStorage.getItem("cart");
    if(x === ''){
      x += JSON.stringify(item);
    }else{
      x += `, ${JSON.stringify(item)}`;
    }
    localStorage.setItem("cart",x)
    ShowShoppingCart();
  }
}

function clearCart() {
  localStorage.setItem("cart", "");
  localStorage.setItem("totalProducts", "0");
  localStorage.setItem("total", "0");
  ShowShoppingCart();
  const htmlCart = document.getElementById("shoppingCart");
  htmlCart.innerHTML=''
}

async function catalogueChange(category = "gatos") {
  const catalogueHtml = document.getElementById("catalogueItems");
  catalogueHtml.innerHTML = "";
  const catalogue = await searchProducts(category);
  catalogue['products'].forEach((product) => {
    catalogueHtml.innerHTML += `
      <div class="col-6">
        <img src = ${product.img}>
        <h2>${product.name}</h2>
        <p class="descriptionText">${product.description}</p>
        <p class="price">$ ${product.price}</p>
        <button id="${category}${product.id}" type="button" class="btn btn-primary addToCart">Agregar al Carrito</button>
      </div>
    `
  });
  catalogue['products'].forEach((product) => {
    createClickEvent(category, product.id);
  });
}

async function searchProducts(category) {
  const response = await fetch(`./requests/${category}/catalogue.json`);
  return response.json();
}

function createClickEvent(category, id) {
  let itemBuyButton = document.getElementById(`${category}${id}`);
  itemBuyButton.setAttribute("productId", id);
  itemBuyButton.setAttribute("category", category);
  itemBuyButton.addEventListener("click", addProductToCart);
}

const showProductInCart = (product) => {
  const htmlCart = document.getElementById("shoppingCart");

  const itemLi = document.createElement("li");
  itemLi.classList.add("list-group-item", "text-right", "mx-2");

  const itemDivName = document.createElement("div");
  itemDivName.textContent = `${product.name}`;

  const itemDivPrice = document.createElement("div");
  itemDivPrice.textContent = `${product.price}`;

  itemLi.appendChild(itemDivName);
  itemLi.appendChild(itemDivPrice);
  htmlCart.appendChild(itemLi);
}

function ShowShoppingCart() {
  let totalFull = 0;
  const htmlTotal = document.getElementById("total");
  const itemsArray = JSON.parse(`[${localStorage.getItem("cart")}]`);
  totalFull = itemsArray.reduce( (accumulator, item) => accumulator + parseInt(item.price),0);
  localStorage.setItem('totalProducts', itemsArray.length);
  localStorage.setItem('total', totalFull);
  htmlTotal.textContent = `$ ${totalFull}`;
}
