import { Box, Paper, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box component={'footer'} p={1} mt={2}>
      <Typography variant="caption">
        All rights reserved. {new Date().getFullYear()} ©
      </Typography>
    </Box>
  )
}
