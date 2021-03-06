module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    // memoization
    'react/no-unstable-nested-components': 'off',
    // Artsy API uses underscore dangle
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'jsx-a1yy/no-noninteractive-element-interactions': 'off',
    'jsx-a1yy/alt-text': 'off',
  },
};
