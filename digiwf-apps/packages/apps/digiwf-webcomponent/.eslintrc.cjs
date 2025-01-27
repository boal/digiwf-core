module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // JavaScript
    "eslint:recommended",

    // TypeScript
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-typescript/recommended",

    // Vue
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",

    // Vermeidung Kollision ESLint
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "no-console": "error",
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: false,
    },
  },
};
