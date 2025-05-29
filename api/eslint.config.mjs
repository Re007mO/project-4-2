import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Still allows CJS if needed
      globals: globals.browser,
    },
    plugins: { js },
    rules: {
      // Allow both import/export and require/module.exports
      "no-undef": "off", // helps avoid false positives with module.exports
      "import/no-commonjs": "off",
      "import/no-nodejs-modules": "off",
    },
    extends: ["js/recommended"],
  },

  // TS config
  tseslint.configs.recommended,

  // Allow CJS files explicitly
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "script", // For CommonJS compatibility
    },
  },

  // Allow MJS files explicitly
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
]);
