import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

const formElement = document.forms["checkout"];

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", () => {
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        const firstInvalid = formElement.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }
    order.checkout();
});

loadHeaderFooter();