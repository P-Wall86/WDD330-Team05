import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
        cart: "src/cart/index.html",
        checkout: "src/checkout/index.html",
        productListing: "src/product_listing/index.html",
        productPages: "src/product_pages/index.html",
        success: "src/checkout/success.html"
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
