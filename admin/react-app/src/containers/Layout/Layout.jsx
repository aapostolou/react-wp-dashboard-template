import { withProps } from '../../models/lib'
import { isLoggedIn } from '../../models/user'

import { Container, Box } from '@mui/material'
import { LoginForm } from '../../components'
import { Home } from '../../pages'

import { styles } from './styles'

const Layout = ({ isLoggedIn }) => {
  return (
    <Container maxWidth="lg" sx={styles.container}>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <Box>
          <Home />
        </Box>
      )}
    </Container>
  )
}

export default withProps({ isLoggedIn })(Layout)
