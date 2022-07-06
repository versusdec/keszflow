import React, { PropsWithChildren } from 'react'
import { Meta } from '@storybook/react'

import { Input } from './index'

export default {
  title: 'Input',
  component: Input,
  argTypes: {},
} as Meta

const Template = (opts: React.FC<PropsWithChildren<any>>) => <Input {...opts} />

export const Basic = Template.bind({})
