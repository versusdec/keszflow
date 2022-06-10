import { Box, Paper, Typography } from '@mui/material'

export const Footer = () => {
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
        All rights reserved. {new Date().getFullYear()} ©
      </Typography>
    </Box>
  )
}
