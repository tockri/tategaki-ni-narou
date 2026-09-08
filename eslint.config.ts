import js from "@eslint/js"
import prettier from "eslint-config-prettier/flat"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  globalIgnores([".wxt/**", ".output/**", "node_modules/**"]),
  js.configs.all,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.webextensions },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    rules: {
      // eslint:all のうち、このプロジェクトの書き方と合わないものだけ緩める
      "one-var": ["error", "never"],
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "sort-keys": "off",
      "sort-imports": "off",
      "id-length": "off",
      "capitalized-comments": "off",
      "max-statements": "off",
      "max-lines-per-function": "off",
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      // 型情報を使う厳しめの追加ルール
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
    }
  },
  {
    // 設定ファイルは manifest 由来のキー名や default export が多いので個別に緩める
    files: ["*.config.ts"],
    rules: {
      camelcase: "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  },
  prettier
)
