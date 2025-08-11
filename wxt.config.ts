import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    default_locale: "en",
    name: "Link Manager",
    permissions: ["tabs", "scripting", "storage"],
  },
  modules: ["@wxt-dev/module-react"],
});
