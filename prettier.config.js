/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 100,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  trailingComma: "none"
};

export default config;
