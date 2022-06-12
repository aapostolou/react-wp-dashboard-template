import { withProps } from '../../models/lib'
import { themeMode } from '../../models/general'

import { CustomThemeProvider } from '../../components'

const CustomThemeProviderContainer = ({ mode, children }) => {
  const customTheme = {
    palette: {
      mode,
    },
  }

  return (
    <CustomThemeProvider customTheme={customTheme}>
      {children}
    </CustomThemeProvider>
  )
}

export default withProps({ mode: themeMode })(CustomThemeProviderContainer)
