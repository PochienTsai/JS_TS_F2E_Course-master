module.exports = {
  env: {
    browser: true,
    es2024: true,
    commonjs: true,
    node: true,
  },
  extends: 'airbnb', // 使用airbnb的規則
  parserOptions: {
    // 解析器設定．可設定解析的code的版本、用哪個模組方式來處理等等功能
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
};
