export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const html = list.map((item) => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, html);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, () => {
      // Adiciona o listener de busca após o header carregar
      const searchForm = document.querySelector("#search-form");
      if (searchForm) {
          searchForm.addEventListener("submit", (e) => {
              e.preventDefault();
              const query = document.querySelector("#search-input").value;
              // Redireciona para a página de listagem com o parâmetro de busca
              window.location.href = `/product_listing/index.html?search=${query}`;
          });
      }
  });
  renderWithTemplate(footerTemplate, footerElement);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}