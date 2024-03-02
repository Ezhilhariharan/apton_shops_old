module.exports= {
    plugins: ["babel",'react', 'react-hooks'],
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
    settings: {
        react: {
          version: "detect"
        }
      },
    rules: {
      "semi": ["error","never"],
      "no-console": ["off"],
      "react/prop-types": ["off"],
      "no-unused-vars": ["error", { "ignoreRestSiblings": true }],
      "extends": "eslint:recommended"
    },
    env: {
      "browser": true,
      "node": true,
      "mocha": true,
      "es6": true
    },
    globals: {
      "Promise": true,
      "verbose": true,
      "cy": true
    }
  }

