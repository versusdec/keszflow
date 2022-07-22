import PropTypes from 'prop-types'
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

export enum ActionButtonIcon {
  Launch = 'launch',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Apps = 'apps',
  Download = 'download',
  Check = 'check',
}

export enum ActionButtonColor {
  Action = 'action',
  Success = 'success',
  Disabled = 'disabled',
  Inherit = 'inherit',
  Primary = 'primary',
  Secondary = 'secondary',
  Error = 'error',
  Info = 'info',
}

export interface ActionButtonProps {
  onClick: IconButtonProps['onClick']
  icon: ActionButtonIcon
  tooltip: string
  disabled?: boolean
  color?: ActionButtonColor
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
        color={color}
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

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
}

ActionButton.defaultProps = {
  color: ActionButtonColor.Primary,
  disabled: false,
}

const getIcon = (icon: ActionButtonProps['icon']): SvgIconComponent => {
  switch (icon) {
    case ActionButtonIcon.Edit:
      return Edit
    case ActionButtonIcon.Delete:
      return DeleteOutline
    case ActionButtonIcon.Launch:
      return LaunchOutlined
    case ActionButtonIcon.Add:
      return AddOutlined
    case ActionButtonIcon.Apps:
      return AppsOutlined
    case ActionButtonIcon.Download:
      return FileDownloadOutlined
    case ActionButtonIcon.Check:
      return CheckOutlined

    default:
      throw new Error('no mapping')
  }
}
