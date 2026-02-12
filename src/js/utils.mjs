// Utility helpers for the site

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const raw = localStorage.getItem(key);
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw;
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) return;
  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  el.addEventListener("click", callback);
}

// Render a list of items using a template function into a parent element
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const html = list.map((item) => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, html);
}

// Render a template into a parent element. If callback provided, call it with data.
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  if (!parentElement) return;
  parentElement.innerHTML = template;
  if (typeof callback === "function") callback(data);
}

// Load an HTML partial from a file
export async function loadTemplate(url) {
  const response = await fetch(url);
  const template = await response.text();
  return template;
}

// Load header and footer templates (expects partials in /partials/)
export async function loadHeaderFooter() {
  // partials are located in src/public/partials so fetch from that path
  const headerTemplate = await loadTemplate("/src/public/partials/header.html");
  const footerTemplate = await loadTemplate("/src/public/partials/footer.html");

  const headerElement = document.getElementById("main-header") || document.querySelector("#main-header");
  const footerElement = document.getElementById("main-footer") || document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// get a parameter from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Show a temporary alert message at the top of <main>
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `
    <span class="alert-message">${message}</span>
    <button class="alert-close" aria-label="Close alert">&times;</button>
  `;

  const close = alert.querySelector(".alert-close");
  if (close) close.addEventListener("click", () => alert.remove());

  const main = document.querySelector("main");
  if (!main) return;

  main.prepend(alert);

  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}
