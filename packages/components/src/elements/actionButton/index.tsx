import React from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import {
  SvgIconComponent,
  LaunchOutlined,
  Edit,
  DeleteOutline,
  AddOutlined,
  AppsOutlined,
} from '@mui/icons-material'

export interface ActionButtonProps {
  onClick: IconButtonProps['onClick']
  icon: 'launch' | 'edit' | 'delete' | 'add' | 'apps'
  tooltip: string
  disabled?: boolean
}

export const ActionButton = ({
  onClick,
  icon,
  tooltip,
  disabled,
}: ActionButtonProps) => {
  const IconComponent = getIcon(icon)
  return (
    <Tooltip title={tooltip}>
      <IconButton
        sx={{
          cursor: 'pointer',
        }}
        onClick={onClick}
        disabled={!!disabled}
      >
        <IconComponent
          color={'primary'}
          sx={{ fontSize: 16, color: !!disabled ? 'inherit' : '' }}
        />
      </IconButton>
    </Tooltip>
  )
}

const getIcon = (icon: ActionButtonProps['icon']): SvgIconComponent => {
  switch (icon) {
    case 'edit':
      return Edit
    case 'delete':
      return DeleteOutline
    case 'launch':
      return LaunchOutlined
    case 'add':
      return AddOutlined
    case 'apps':
      return AppsOutlined

    default:
      throw new Error('no mapping')
  }
}
