import { CustomThemeProvider, Debugger } from './components'
import {
  GlobalSpinner,
  TranslationsProvider,
  Layout,
  CustomToastContainer,
} from './containers'

import { isDev } from './utils'

import './styles.css'

const App = () => (
  <CustomThemeProvider>
    <TranslationsProvider>
      {isDev && <Debugger />}
      <GlobalSpinner />
      <CustomToastContainer />
      <Layout />
    </TranslationsProvider>
  </CustomThemeProvider>
)

export default App
