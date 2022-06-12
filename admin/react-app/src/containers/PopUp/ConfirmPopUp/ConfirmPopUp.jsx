import { withProps } from '../../../models/lib'
import { confirmPopUpProps, closeConfirmPopUp } from '../../../models/popup'

import { ConfirmPopUp } from '../../../components'

const ConfirmPopUpWrapper = ({ props, ...rest }) => (
  <ConfirmPopUp {...props} {...rest} />
)

export default withProps({
  props: confirmPopUpProps,
  closeConfirmPopUp,
})(ConfirmPopUpWrapper)
