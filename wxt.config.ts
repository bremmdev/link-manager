import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Link Manager",
    permissions: ["tabs", "scripting", "storage"],
  },
  modules: ["@wxt-dev/module-react"],
});
