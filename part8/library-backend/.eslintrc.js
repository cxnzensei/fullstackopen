// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  'parserOptions': {
    'ecmaFeatures': { 'jsx': true, },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': 0,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
    'object-curly-newline': ['error', {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 2
      },
      'ObjectPattern': {
        'multiline': true,
        'minProperties': 4
      },
      'ImportDeclaration': {
        'multiline': true,
        'minProperties': 4
      },
    }],
  }
}
