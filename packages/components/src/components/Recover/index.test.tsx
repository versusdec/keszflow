import React from 'react'
import { SignIn } from './index'
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

describe('Sign In', () => {
  const getComponent = () => <SignIn handleSubmit={() => {}} />

  it('renders all components', () => {
    render(<SignIn handleSubmit={() => {}} />)
    expect(screen.getByTestId('signin')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('login')).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
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
    const wrapped = mount(<SignIn handleSubmit={() => {}} />)
    expect(wrapped.find("input[name='login']").get(0).props.value).toEqual('')
    expect(wrapped.find("input[name='password']").get(0).props.value).toEqual(
      ''
    )
  })
})

describe('Sign in Form', () => {
  test('should update login field on change', () => {
    const tree = mount(<SignIn handleSubmit={() => {}} />)
    const login = tree.find("input[name='login']")
    login.simulate('change', {
      persist: () => {},
      target: {
        name: 'login',
        value: 'test@mail.com',
      },
    })
    expect(login.html()).toMatch('test@mail.com')
  })

  test('should update password field on change', () => {
    const tree = mount(<SignIn handleSubmit={() => {}} />)

    const password = tree.find("input[name='password']")

    password.simulate('change', {
      persist: () => {},
      target: {
        name: 'password',
        value: 'test',
      },
    })

    expect(password.html()).toMatch('test')
  })
})

describe('LoginFormComponent', () => {
  describe('Submitting form', () => {
    // Arrange--------------
    // Set up variables accessible in tests
    let wrapper: RenderResult
    let fakeUser: { login: string; password: string }
    let loginNode: HTMLInputElement
    let passwordNode: HTMLInputElement
    let loginButtonNode: HTMLButtonElement
    let handleSubmit: () => void

    beforeEach(() => {
      // Here's my submitHandler mock that isn't getting called
      handleSubmit = jest.fn()

      const props = {
        handleSubmit,
      }

      wrapper = render(<SignIn {...props} />)

      fakeUser = {
        login: 'admin@test.com',
        password: 'admin',
      }
      loginNode = wrapper.getByTestId('login') as HTMLInputElement
      passwordNode = wrapper.getByTestId('password') as HTMLInputElement
      loginButtonNode = wrapper.getByTestId('submit') as HTMLButtonElement

      // Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(loginNode, { target: { value: fakeUser.login } })
        fireEvent.change(passwordNode, { target: { value: fakeUser.password } })

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
