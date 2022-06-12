import { translations } from '../../customization'

export const translateWithLanguage = (language) => ({
  translate: (token, rest) => {
    let translationsToCheck = null

    // if token is an object
    if (typeof token === 'object') {
      translationsToCheck = token
    } else if (translations[token]) {
      // if token exists in the hardcoded translations
      translationsToCheck = translations[token]
    } else {
      return token
    }

    // if translation is a function
    if (typeof translationsToCheck === 'function') {
      return translationsToCheck({ ...rest })
    }

    // if translation is an object of languages and has the specific language
    if (translationsToCheck[language]) {
      // if specific translation is function
      if (typeof translationsToCheck[language] === 'function') {
        return translationsToCheck[language]({ ...rest })
      } else {
        return translationsToCheck[language]
      }
    }

    // if translation has a fallback value
    if (translationsToCheck._default) {
      if (typeof translationsToCheck._default === 'function') {
        return translationsToCheck._default({ ...rest })
      } else {
        return translationsToCheck._default
      }
    }

    // if nothing else works
    if (typeof translationsToCheck === 'string') {
      return translationsToCheck
    } else {
      return token
    }
  },
})
