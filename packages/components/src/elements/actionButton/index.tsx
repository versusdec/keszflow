import React from 'react'
import { IconButton, Tooltip } from '@mui/material'

export const ActionButton = ({ onClick, Icon, tooltip, disabled }: any) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        sx={{
          cursor: 'pointer',
        }}
        onClick={onClick}
        disabled={!!disabled}
      >
        <Icon
          color={'primary'}
          sx={{ fontSize: 16, color: !!disabled ? 'inherit' : '' }}
          title={'Open'}
        />
      </IconButton>
    </Tooltip>
  )
}
