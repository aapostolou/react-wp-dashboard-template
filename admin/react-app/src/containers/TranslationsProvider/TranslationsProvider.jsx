import { TranslationsProvider } from '../../components'

import { withProps } from '../../models/lib'
import { selectedLanguage } from '../../models/language'

export default withProps({ language: selectedLanguage })(TranslationsProvider)
