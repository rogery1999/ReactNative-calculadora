// npm install --save-dev eslint-config-prettier

module.exports = {
  root: true,
  extends: ['@react-native-community/eslint-config', 'eslint-config-prettier'],
  rules: {
    'prettier/prettier': 0,
  },
};
