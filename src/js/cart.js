import { getLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";

function setupRemoveItemListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      removeFromCart(productId);
      renderCartContents();
    });
  });
}

function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== productId);
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

function mergeCartItems(cartItems) {
  const merged = {};

  cartItems.forEach(item => {
    if (merged[item.Id]) {
      merged[item.Id].Quantity += item.Quantity || 1;
      merged[item.Id].FinalPrice += item.FinalPrice;
    } else {
      merged[item.Id] = { ...item };
      if (!merged[item.Id].Quantity) merged[item.Id].Quantity = 1;
    }
  });

  return Object.values(merged);
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = mergeCartItems(cartItems);

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
    calculateListTotal(cartItems);
    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
    document.querySelector(".cart-total").innerText = "";
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
      <img src="${item.Images?.PrimaryMedium}" alt="${item.Name}"/>
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;
}

loadHeaderFooter();
renderCartContents();

const checkoutBtn = document.querySelector(".button");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    const cartItems = getLocalStorage("so-cart") || [];
    if (cartItems.length === 0) {
      e.preventDefault();
      alertMessage("Your cart is empty. Please add items before checking out.");
    }
  });
}

