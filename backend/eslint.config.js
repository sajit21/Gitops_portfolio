import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
      }
    }
  },
  {
    ignores: ["node_modules/", "generated/", "dist/", "build/"]
  }
];
