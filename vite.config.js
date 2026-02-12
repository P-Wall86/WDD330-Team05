import { defineConfig } from "vite";

export default defineConfig({
  root: "src",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        cart: "cart/index.html",
        checkout: "checkout/index.html",
        productListing: "product_listing/index.html",
        productPages: "product_pages/index.html",
        success: "checkout/success.html"
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
