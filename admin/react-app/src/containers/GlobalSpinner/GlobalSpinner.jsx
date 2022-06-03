import { withProps } from '../../models/lib'
import { isSpinnerEnabled } from '../../models/general'

import { Spinner } from '../../components'

export default withProps({ isOpen: isSpinnerEnabled })(Spinner)
