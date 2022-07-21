import { render, screen } from '@testing-library/react'
import { Loader } from './index'

describe('Loader', () => {
  let loader: HTMLElement

  beforeEach(() => {
    render(<Loader />)
    loader = screen.getByTestId('loader')
  })

  test('renders', () => {
    expect(loader).toBeInTheDocument()
  })
})
