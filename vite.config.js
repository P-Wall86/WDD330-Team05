import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve("src", "index.html"),
        cart: resolve("src", "cart", "index.html"),
        checkout: resolve("src", "checkout", "index.html"),
        product1: resolve("src", "product_pages", "index.html"),
        product_listing: resolve("src", "product_listing", "index.html"),
        success: resolve("src", "checkout", "success.html")
      },
    },
  },

  preview: {
    allowedHosts: ["wdd-330-hlrp.onrender.com"],
  },
});
