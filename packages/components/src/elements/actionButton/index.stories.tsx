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
      control: { type: 'string' },
    },
    tooltip: {
      control: { type: 'string' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'string' },
    },
  },
} as Meta

const Template = (opts: ActionButtonProps) => <ActionButton {...opts} />

export const Basic = Template.bind({})
