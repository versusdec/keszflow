import { ReactElement } from 'react'
import { Head } from '@keszflow/components'
import { Box, Drawer } from '@mui/material'
import { KeszflowBusinessLogo } from '../../components/KeszflowBusinessLogo'

interface Props {
  children?: ReactElement
  title?: string
}

export default function PublicLayout(props: Props) {
  const drawerWidth = 500

  return (
    <>
      <Head title={props.title} />
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
          <KeszflowBusinessLogo width={365} />
        </Box>
      </Box>
    </>
  )
}
