import { getLocalStorage } from "./utils.mjs";
import {loadHeaderFooter} from "./utils.mjs";

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
  const cartItems = getLocalStorage("so-cart") || [];
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
      calculateListTotal(cartItems);
  } else {
      document.querySelector(".cart-footer").classList.add("hide");
  }

  setupRemoveItemListeners();
}

function calculateListTotal(cartItems) {
  const amounts = cartItems.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  
  cartTotal.innerText = `Total: $${total.toFixed(2)}`; 
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
  <button class="remove-item" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimarySmall}" alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">Color: ${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

loadHeaderFooter();
renderCartContents();
