import React, { ReactElement } from 'react'
import { Head, LogoLG } from '@keszflow/components'
import { Box, Drawer } from '@mui/material'
import { drawerWidth } from '@keszflow/panel/variables'

interface Props {
  children?: ReactElement
  title?: string
}

export default function PublicLayout(props: Props) {
  const title = props.title
    ? props.title
    : props.children?.props.title
    ? props.children.props.title
    : false

  return (
    <>
      <Head title={title} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          display: 'flex',
          flexGrow: 1,
          bgcolor: 'action.focus',
        }}
      >
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            maxWidth: drawerWidth,
            width: '100%',
            '& .MuiDrawer-paper': {
              maxWidth: drawerWidth,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3,
              bgcolor: 'background.paper',
            },
          }}
        >
          {props.children}
        </Drawer>
        <Box
          sx={{
            width: '66%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LogoLG width={365} />
        </Box>
      </Box>
    </>
  )
}
