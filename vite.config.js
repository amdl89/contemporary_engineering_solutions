import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/about.html"),
        sparePartsServices: resolve(__dirname, "pages/spare-parts-services.html"),
        lubricants: resolve(__dirname, "pages/lubricants.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        jawCrusher: resolve(__dirname, "pages/jaw-crusher.html"),
        coneCrusher: resolve(__dirname, "pages/cone-crusher.html"),
        vibratingScreen: resolve(__dirname, "pages/vibrating-screen.html"),
        verticalShaftImpactor: resolve(__dirname, "pages/vertical-shaft-impactor.html"),
        horizontalShaftImpactor: resolve(__dirname, "pages/horizontal-shaft-impactor.html"),
        rollCrusher: resolve(__dirname, "pages/roll-crusher.html"),
        spiralClassifier: resolve(__dirname, "pages/spiral-classifier.html"),
        hydroCyclone: resolve(__dirname, "pages/hydro-cyclone.html"),
        screwClassifier: resolve(__dirname, "pages/screw-classifier.html"),
      },
    },
  },
});
