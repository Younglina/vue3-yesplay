module.exports = {
  extends: '@antfu',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'array-callback-return': 'off',
    'no-throw-literal': 'off',
  },
}
