import React, { ReactElement } from 'react'

import { BlankLayout } from '@keszflow/components'
import { NextPageWithLayout } from '../types'
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const Page404 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      p={3}
    >
      <Typography
        variant={'h1'}
        sx={{
          fontWeight: 'bold',
          color: 'primary.dark',
        }}
      >
        <Stack direction={'row'} alignContent={'center'}>
          4{' '}
          <Box
            sx={{
              animation: 'bounce 3s ease infinite',
              m: '0 20px',
              '@keyframes bounce': {
                '0%': {
                  transform: 'translate(0, 0)',
                },
                '5%': {
                  transform: 'translate(0, -10%)',
                },
                '10%': {
                  transform: 'translate(0, 5%)',
                },
                '15%': {
                  transform: 'translate(0, -10%)',
                },
                '20%': {
                  transform: 'translate(0, 5%)',
                },
                '25%': {
                  transform: 'translate(0, -5%)',
                },
                '30%': {
                  transform: 'translate(0, 0%)',
                },

                '100%': {
                  transform: 'translate(0, 0)',
                },
              },
            }}
          >
            0
          </Box>{' '}
          4
        </Stack>
      </Typography>
      <Typography variant={'h5'}>Page not found</Typography>
      <Typography variant={'h5'}>
        Return to <Link href={'/'}>main</Link> page
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'primary.light',
          borderRadius: '20px',
          position: 'absolute',
          zIndex: '-1',
          right: '-50%',
          top: '-66%',
          transform: 'rotate(70deg)',
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100vw',
          bgcolor: 'transparent',
          position: 'absolute',
          zIndex: '-1',
          left: '-50%',
          bottom: '-100%',
          border: 'solid',
          borderRadius: '100%',
          borderWidth: '50px',
          borderColor: 'primary.light',
        }}
      />
    </Box>
  )
}

Page404.defaultProps = {
  title: '404',
}
;(Page404 as NextPageWithLayout).getLayout = function getLayout(
  page: ReactElement
) {
  return <BlankLayout>{page}</BlankLayout>
}

export default Page404
