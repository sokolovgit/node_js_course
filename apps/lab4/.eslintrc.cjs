module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      require.resolve('./tsconfig.json'),
      require.resolve('./tsconfig.util.json'),
    ],
    ecmaVersion: 2020,  
    sourceType: 'module', 
  },
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'no-useless-constructor': 'off',
    'brace-style': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
