import { Meta } from '@storybook/react'

import { Head } from '@keszflow/components'

export default {
  title: 'Head',
  component: Head,
  argTypes: {
    title: {
      control: { type: 'string' },
    },
  },
} as Meta

const Template = (opts: { title: string | undefined }) => <Head {...opts} />

export const Basic = Template.bind({})
