import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material'
import { Logout, AccountCircle } from '@mui/icons-material'

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const auth = true

  return (
    <Paper
      elevation={1}
      square
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Notification: Welcome to Keszflow
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  )
}
