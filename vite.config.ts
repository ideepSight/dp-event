import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "event.ts",
      name: "DPEvent",
      fileName: (format) => `dp-event.${format}.js`,
    },
    rollupOptions: {
      external: ["events", "mobx"],
      output: {
        globals: {
          events: "events",
          mobx: "mobx",
        },
      },
    },
  },
  plugins: [
    dts({
      entryRoot: ".",
      outDir: "dist",
    }),
  ],
});
