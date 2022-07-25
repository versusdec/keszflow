import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  AppBar,
  Toolbar,
} from '@mui/material'
import { Logout, AccountCircle } from '@mui/icons-material'
import Link from 'next/link'
import { LogoLG } from '@keszflow/components'

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Paper
      elevation={1}
      square
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
              <Link href="/" passHref>
                <a>
                  <LogoLG
                    height={40}
                    colorMain={'pastel.primary.100'}
                    colorSecondary={'primary.main'}
                  />
                </a>
              </Link>
            </Typography>

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
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  )
}
