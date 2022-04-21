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
  AppBar, Toolbar
} from '@mui/material'
import { Logout, AccountCircle  } from '@mui/icons-material'

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const auth = true;

  return (
    <Paper
      elevation={1}
      square
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
      {/*<Grid
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        p={1}
      >
        <Grid item>
          <Typography sx={{ minWidth: 100 }}>balance/notifications</Typography>
        </Grid>

        <Grid item>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>*/}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
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
