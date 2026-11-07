import js from "@eslint/js";

export default [
  js.configs.recommended,
  { 
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },

    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "linebreak-style": ["error", "unix"],
      "no-undef": "off"
    }
  },
];