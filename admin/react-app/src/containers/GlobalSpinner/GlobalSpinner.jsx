import { withProps } from '../../models/lib'
import { isSpinnerEnabled } from '../../models/general'

import { Spinner } from '../../components'

import { styles } from './styles'

const GlobalSpinner = ({ isOpen }) => (
  <Spinner isOpen={isOpen} sx={styles.spinner} />
)

export default withProps({ isOpen: isSpinnerEnabled })(GlobalSpinner)
