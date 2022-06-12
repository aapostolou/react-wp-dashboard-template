import { withProps } from '../../models/lib'
import { isLoggedIn } from '../../models/user'

import { Container } from '@mui/material'
import { LoginForm } from '../../components'
import { Home } from '../../pages'
import { Header } from '../../blocks'

import { styles } from './styles'

const Layout = ({ isLoggedIn }) => {
  return (
    <>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <Header />
          <Container maxWidth="lg" sx={styles.container}>
            <Home />
          </Container>
        </>
      )}
    </>
  )
}

export default withProps({ isLoggedIn })(Layout)
