import { Button } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
