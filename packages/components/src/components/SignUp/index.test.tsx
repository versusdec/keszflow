import React from 'react'
import { SignUp } from './index'
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

describe('Sign Up', () => {
  const getComponent = () => <SignUp handleSubmit={() => {}} />

  it('renders all components', () => {
    render(<SignUp handleSubmit={() => {}} />)
    expect(screen.getByTestId('signup')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
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
    const wrapped = mount(<SignUp handleSubmit={() => {}} />)
    expect(wrapped.find("input[name='email']").get(0).props.value).toEqual('')
    expect(wrapped.find("input[name='password']").get(0).props.value).toEqual(
      ''
    )
    expect(
      wrapped.find("input[name='confirmPassword']").get(0).props.value
    ).toEqual('')
  })
})

describe('Sign in Form', () => {
  test('should update login field on change', () => {
    const tree = mount(<SignUp handleSubmit={() => {}} />)
    const login = tree.find("input[name='email']")
    login.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'test@mail.com',
      },
    })
    expect(login.html()).toMatch('test@mail.com')
  })

  test('should update password field on change', () => {
    const tree = mount(<SignUp handleSubmit={() => {}} />)

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

  test('should update confirm password field on change', () => {
    const tree = mount(<SignUp handleSubmit={() => {}} />)

    const password = tree.find("input[name='confirmPassword']")

    password.simulate('change', {
      persist: () => {},
      target: {
        name: 'confirmPassword',
        value: 'test',
      },
    })

    expect(password.html()).toMatch('test')
  })

  describe('SignUpFormComponent', () => {
    describe('Submitting form', () => {
      // Arrange--------------
      // Set up variables accessible in tests
      let wrapper: RenderResult
      let fakeUser: { login: string; password: string; confirmPassword: string }
      let loginNode: HTMLInputElement
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

        wrapper = render(<SignUp {...props} />)

        fakeUser = {
          login: 'admin@test.com',
          password: 'admin',
          confirmPassword: 'admin',
        }
        loginNode = wrapper.getByTestId('email') as HTMLInputElement
        passwordNode = wrapper.getByTestId('password') as HTMLInputElement
        confirmPasswordNode = wrapper.getByTestId(
          'confirmPassword'
        ) as HTMLInputElement

        loginButtonNode = wrapper.getByTestId('submit') as HTMLButtonElement

        // Act--------------
        // Change the input values
        act(() => {
          fireEvent.change(loginNode, { target: { value: fakeUser.login } })
          fireEvent.change(passwordNode, {
            target: { value: fakeUser.password },
          })
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
})
