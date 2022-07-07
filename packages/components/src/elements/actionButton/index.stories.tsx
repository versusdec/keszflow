import { Meta } from '@storybook/react'

import { ActionButton, ActionButtonProps } from './index'

export default {
  title: 'Action Button',
  component: ActionButton,
  argTypes: {
    onClick: {
      table: { disabled: true },
    },
    icon: {
      defaultValue: 'edit',
      options: ['edit', 'delete', 'launch', 'add', 'apps', 'download', 'check'],
      control: { type: 'select' },
    },
    tooltip: {
      variant: 'Tooltip text',
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'color' },
      defaultValue: 'primary',
    },
  },
} as Meta

const Template = (opts: ActionButtonProps) => <ActionButton {...opts} />

export const Basic = Template.bind({})
