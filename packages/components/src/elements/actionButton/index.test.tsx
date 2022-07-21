import { fireEvent, render, screen } from '@testing-library/react'
import { ActionButton } from './index'

describe('action button', () => {
  let onClick: () => void
  let iconBtn: HTMLElement

  beforeEach(() => {
    onClick = jest.fn()
    render(<ActionButton onClick={onClick} icon={'edit'} tooltip={'tip'} />)
    iconBtn = screen.getByTestId('icon-btn')
    fireEvent.click(iconBtn)
  })

  test('renders', () => {
    expect(iconBtn).toBeInTheDocument()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
