import { translations } from '../../customization'

export const translateWithLanguage = (language) => ({
  translate: (token, rest) => {
    // if token doesn't exists
    if (!translations[token]) {
      return token
    }

    // if translation is a function
    if (typeof translations[token] === 'function') {
      return translations[token]({ ...rest })
    }

    // if translation is an object of language and has the specific language
    if (translations[token][language]) {
      // if specific translation is function
      if (typeof translations[token][language] === 'function') {
        return translations[token][language]({ ...rest })
      } else {
        return translations[token][language]
      }
    }

    // if translation has a fallback value
    if (translations[token]._default) {
      if (typeof translations[token]._default === 'function') {
        return translations[token]._default({ ...rest })
      } else {
        return translations[token]._default
      }
    }

    // if nothing else works
    if (typeof translations[token] === 'string') {
      return translations[token]
    } else {
      return token
    }
  },
})
