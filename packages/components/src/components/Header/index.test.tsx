import React from 'react'
import { Header } from './index'

import { mount, shallow } from 'enzyme'

describe('Header', () => {
  const getComponent = () => <Header />
  it('Should render correctly with Shallow', () => {
    const component = shallow(getComponent())
    expect(component).toMatchSnapshot()
  })
  it('Should render correctly with mount', () => {
    const component = mount(getComponent())
    expect(component).toMatchSnapshot()
  })
})
