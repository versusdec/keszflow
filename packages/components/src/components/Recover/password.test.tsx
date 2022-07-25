import React from 'react'
import { Password } from './index'
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
) => <Password handleSubmit={() => {}} {...props} />
describe('Password', () => {
  it('renders all components', () => {
    render(getComponent())
    expect(screen.getByTestId('passwordComponent')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeInTheDocument()
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
    expect(wrapped.find("input[name='password']").get(0).props.value).toEqual(
      ''
    )
    expect(
      wrapped.find("input[name='confirmPassword']").get(0).props.value
    ).toEqual('')
  })
})

describe('Password Form', () => {
  test('should update on change', () => {
    const tree = mount(getComponent())
    const password = tree.find("input[name='password']")
    password.simulate('change', {
      persist: () => {},
      target: {
        value: '100500',
      },
    })
    expect(password.html()).toMatch('100500')
  })

  test('should update password field on change', () => {
    const tree = mount(getComponent())

    const confirmPassword = tree.find("input[name='password']")

    confirmPassword.simulate('change', {
      persist: () => {},
      target: {
        name: 'password',
        value: '100500',
      },
    })

    expect(confirmPassword.html()).toMatch('100500')
  })
})

describe('Password Form Component', () => {
  describe('Submitting form', () => {
    // Arrange--------------
    // Set up variables accessible in tests
    let wrapper: RenderResult
    let fakeUser: { password: string; confirmPassword: string }
    let passwordNode: HTMLInputElement
    let confirmPasswordNode: HTMLInputElement
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
        password: '100500',
        confirmPassword: '100500',
      }

      passwordNode = wrapper.getByTestId('password') as HTMLInputElement
      confirmPasswordNode = wrapper.getByTestId(
        'confirmPassword'
      ) as HTMLInputElement
      loginButtonNode = wrapper.getByTestId('submit') as HTMLButtonElement

      // Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(passwordNode, { target: { value: fakeUser.password } })
        fireEvent.change(confirmPasswordNode, {
          target: { value: fakeUser.confirmPassword },
        })

        // This should submit the form?
        fireEvent.click(loginButtonNode)
      })
    })

    test('Submits Login with email and password', () => {
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
