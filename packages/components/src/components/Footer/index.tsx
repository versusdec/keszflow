import React from 'react'
import { Box, Typography } from '@mui/material'

const projectStartYear = 2022

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <Box
      component={'footer'}
      p={2}
      mt={2}
      sx={{
        position: 'sticky',
        bottom: 0,
        bgcolor: 'grey.100',
        boxShadow: '0 5px 10px 0px black',
        zIndex: 1,
      }}
    >
      <Typography variant="caption">
        Keszflow Business{' '}
        {currentYear > projectStartYear ? `2022–${currentYear}` : currentYear}{' '}
        &copy; IONE Software Sp. z o.o. All rights reserved.
      </Typography>
    </Box>
  )
}
