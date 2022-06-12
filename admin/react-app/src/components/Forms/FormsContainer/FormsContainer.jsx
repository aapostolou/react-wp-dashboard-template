import { withProps } from '../../../models'
import { activeForm } from '../../../models/forms'

const FormContainer = ({ forms = {}, activeForm }) => {
  return (
    <>
      {Object.keys(forms).map((key) => {
        const Form = forms[key]

        const activeFormKey = activeForm?.key
        const props = activeForm?.props

        return <Form key={key} isOpen={key === activeFormKey} {...props} />
      })}
    </>
  )
}

export default withProps({ activeForm })(FormContainer)
