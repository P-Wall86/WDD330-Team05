import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "src",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        productListing: resolve(__dirname, "src/product_listing/index.html"),
        productPages: resolve(__dirname, "src/product_pages/index.html"),
        success: resolve(__dirname, "src/checkout/success.html")
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css'))
            return 'css/[name][extname]';
          return '[name][extname]';
        }
      }
    },
  },

  preview: {
    allowedHosts: ["wdd-330-hlrp.onrender.com"],
  },
});
