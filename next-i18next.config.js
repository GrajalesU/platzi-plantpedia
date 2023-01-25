const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'es'],
  },
  localePath: path.resolve('./public/locales'),
  react: { useSuspense: false },
}
