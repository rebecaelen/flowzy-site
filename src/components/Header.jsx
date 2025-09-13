import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Code, Logout } from '@mui/icons-material'

const Header = ({ user, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Code sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flowzy Editor
        </Typography>
        
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Olá, {user.name}
            </Typography>
            <Button 
              color="inherit" 
              onClick={onLogout}
              startIcon={<Logout />}
            >
              Sair
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header