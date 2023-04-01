module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true
  },
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:testing-library/react"
  ],
  "overrides": [{
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    extends: ["plugin:testing-library/react"]
  }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "prettier",
    "react-hooks",
    "testing-library"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "comma-dangle": ["error", "only-multiline"],
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
    "eol-last": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "iife", next: "iife" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any",    prev: ["const", "let", "var"], next: ["singleline-const", "singleline-let", "singleline-var"]}
    ]
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
};
