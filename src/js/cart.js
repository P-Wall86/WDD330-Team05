import { getLocalStorage } from "./utils.mjs";

function setupRemoveItemListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      removeFromCart(productId);
      renderCartContents();
      setupRemoveItemListeners();
    });
  });
}

function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== productId);
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);

    document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(2)}`;

    const htmlItems = cartItems.map(cartItemTemplate);
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    setupRemoveItemListeners();
    
  } else {
    document.querySelector(".product-list").innerHTML = "Your cart is empty.";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
  <button class="remove-item" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();
