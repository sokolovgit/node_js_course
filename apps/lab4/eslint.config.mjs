// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['./dist', './node_modules'],

  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  rules: {
    'perfectionist/sort-imports': 'off',
  },

  formatters: {
    html: true,
  },
})
