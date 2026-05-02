import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@inertiajs/react": path.resolve(__dirname, "./src/lib/inertia-mock.tsx"),
        },
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
