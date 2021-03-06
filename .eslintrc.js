module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'symbol-description': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
