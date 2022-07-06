import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import {
  SvgIconComponent,
  LaunchOutlined,
  Edit,
  DeleteOutline,
  AddOutlined,
  AppsOutlined,
  FileDownloadOutlined,
  CheckOutlined,
} from '@mui/icons-material'

export interface ActionButtonProps {
  onClick: IconButtonProps['onClick']
  icon: 'launch' | 'edit' | 'delete' | 'add' | 'apps' | 'download' | 'check'
  tooltip: string
  disabled?: boolean
  color?:
    | 'action'
    | 'disabled'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined
  [rest: string]: any
}

export const ActionButton = ({
  onClick,
  icon,
  tooltip,
  disabled,
  color,
  ...rest
}: ActionButtonProps) => {
  const IconComponent = getIcon(icon)
  const IconJSX = (
    <IconButton
      data-testid={'icon-btn'}
      sx={{
        cursor: 'pointer',
      }}
      onClick={onClick}
      disabled={!!disabled}
      {...rest}
    >
      <IconComponent
        color={color || 'primary'}
        sx={{ fontSize: 16, color: disabled ? 'inherit' : '' }}
      />
    </IconButton>
  )
  return disabled ? (
    IconJSX
  ) : (
    <Tooltip data-testid={'tooltip'} title={tooltip}>
      {IconJSX}
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
    case 'download':
      return FileDownloadOutlined
    case 'check':
      return CheckOutlined

    default:
      throw new Error('no mapping')
  }
}
