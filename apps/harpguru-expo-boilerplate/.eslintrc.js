module.exports = {
  extends: ['../../.eslintrc.base.js', 'plugin:react/recommended'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'desc' },
        pathGroups: [
          {
            pattern: './useStyles',
            group: 'index',
          },
          {
            pattern: './types',
            group: 'index',
          },
          {
            pattern: './constants',
            group: 'index',
          },
        ],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
