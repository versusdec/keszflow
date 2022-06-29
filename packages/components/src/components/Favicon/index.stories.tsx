import { Meta } from '@storybook/react'

import Favicon from '../Favicon'

export default {
  title: 'Favicon',
  component: Favicon,
} as Meta

const Template = () => <Favicon />

export const Basic = Template.bind({})
