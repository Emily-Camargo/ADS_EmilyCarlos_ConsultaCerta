import type { Meta, StoryObj } from '@storybook/react'
import Input from '.'

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    variant: {
      options: ['outlined', 'standard', 'filled'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'select' },
    },
    shrink: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [(Story) => <Story />],
}

export default meta
type Story = StoryObj<typeof Input>

export const Component: Story = {
  args: {
    label: 'Input',
    type: 'text',
  },
}
