import { Meta } from '@storybook/react'

import { KeszflowBusinessLogo, ILogoProps } from './index'

export default {
  title: 'Keszflow Business Logo',
  component: KeszflowBusinessLogo,
  argTypes: {
    width: {
      control: { type: 'number', min: 1, step: 10 },
    },
    height: {
      control: { type: 'number', min: 1, step: 10 },
    },
    colorMain: {
      control: { type: 'color' },
    },
    colorSecondary: {
      control: { type: 'color' },
    },
  },
} as Meta

const Template = (opts: ILogoProps) => <KeszflowBusinessLogo {...opts} />

export const Basic = Template.bind({})
