import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './index'
import { Formik } from 'formik'

describe('custom input', () => {
  let input: HTMLInputElement
  let handler: (values: any) => void
  beforeEach(() => {
    render(
      <Formik
        initialValues={{ test: '' }}
        onSubmit={(values) => {
          handler(values)
        }}
      >
        <Input name={'test'} placeholder={'input'} />
      </Formik>
    )
    input = screen.getByPlaceholderText('input')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { name: 'test', value: 'test' } })
    fireEvent.blur(input)
  })

  test('renders', () => {
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('test')
  })
})
