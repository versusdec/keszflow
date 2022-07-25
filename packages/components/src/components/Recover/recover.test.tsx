import React from 'react'
import { Recover } from './index'
import {
  fireEvent,
  render,
  screen,
  cleanup,
  RenderResult,
  waitFor,
  act,
} from '@testing-library/react'
import { mount, shallow } from 'enzyme'

afterEach(cleanup)

const getComponent = (
  props?: { handleSubmit: () => void; [x: string]: any } | undefined
) => <Recover handleSubmit={() => {}} {...props} />

describe('Recover In', () => {
  it('renders all components', () => {
    render(getComponent())
    expect(screen.getByTestId('recover')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
  })

  it('Should render correctly with Shallow', () => {
    const component = shallow(getComponent())
    expect(component).toMatchSnapshot()
  })

  it('Should render correctly with mount', () => {
    const component = mount(getComponent())
    expect(component).toMatchSnapshot()
  })

  it('should have empty inputs', () => {
    const wrapped = mount(getComponent())
    expect(wrapped.find("input[name='email']").get(0).props.value).toEqual('')
  })
})

describe('Recover Form', () => {
  test('should update login field on change', () => {
    const tree = mount(getComponent())
    const email = tree.find("input[name='email']")
    email.simulate('change', {
      persist: () => {},
      target: {
        value: 'test@mail.com',
      },
    })
    expect(email.html()).toMatch('test@mail.com')
  })
})

describe('Recover Component', () => {
  describe('Submitting form', () => {
    // Arrange--------------
    // Set up variables accessible in tests
    let wrapper: RenderResult
    let fakeUser: { email: string }
    let emailNode: HTMLInputElement
    let loginButtonNode: HTMLButtonElement
    let handleSubmit: () => void

    beforeEach(() => {
      // Here's my submitHandler mock that isn't getting called
      handleSubmit = jest.fn()

      const props = {
        handleSubmit,
      }

      wrapper = render(getComponent(props))

      fakeUser = {
        email: 'admin@test.com',
      }
      emailNode = wrapper.getByTestId('email') as HTMLInputElement
      loginButtonNode = wrapper.getByTestId('submit') as HTMLButtonElement

      // Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(emailNode, { target: { value: fakeUser.email } })

        // This should submit the form?
        fireEvent.click(loginButtonNode)
      })
    })

    test('Submits with email', () => {
      // Assert--------------
      act(async () => {
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(1)
          expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
        })
      })
    })
  })
})
