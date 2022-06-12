import { withProps } from '../../models/lib'
import {
  availableLanguages,
  selectedLanguage,
  changeLanguage,
} from '../../models/language'

import { LanguagePicker } from '../../components'

export default withProps({
  languages: availableLanguages,
  selectedLanguage,
  onChange: changeLanguage,
})(LanguagePicker)
