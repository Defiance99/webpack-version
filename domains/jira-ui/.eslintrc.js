module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/no-unresolved": [
      0,
      {
        caseSensitive: false,
      },
    ],
    "import/no-named-as-default": [0],
    "import/no-extraneous-dependencies": [
      0,
      {
        devDependencies: ["**/*.test.js", "**/*.spec.js"],
      },
    ],
    "max-len": ["error", { code: 130 }],
    "vuejs-accessibility/label-has-for": ["off"],
    "vuejs-accessibility/aria-props": ["off"],
    "vuejs-accessibility/form-control-has-label": ["off"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "arrow-body-style": ["off"],
    "no-shadow": "off",
    "no-continue": "off",
    "linebreak-style": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/icons/**.vue"],
      rules: {
        "max-len": ["off"],
      },
    },
  ],
};
