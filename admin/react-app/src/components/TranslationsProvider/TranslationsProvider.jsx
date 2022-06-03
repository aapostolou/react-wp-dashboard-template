import { createContext, useContext } from 'react'

import { translateWithLanguage } from './translateWithLanguage'

const TranslationsContext = createContext()

const useTranslation = () => useContext(TranslationsContext)

const TranslationsProvider = ({ language, children }) => {
  const { translate } = translateWithLanguage(language)

  const value = {
    translate,
  }

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

export { useTranslation }
export default TranslationsProvider
