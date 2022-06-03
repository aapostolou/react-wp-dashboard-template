import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CustomToastContainer = () => (
  <ToastContainer
    position="bottom-left"
    autoClose={5000}
    theme="colored"
    hideProgressBar
    newestOnTop
    closeOnClick
  />
)

export default CustomToastContainer
