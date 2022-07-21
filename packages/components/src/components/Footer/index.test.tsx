import React from 'react'
import { Footer } from './index'

import { mount, shallow } from 'enzyme'

describe('Footer', () => {
  const getComponent = () => <Footer />
  it('Should render correctly with Shallow', () => {
    const component = shallow(getComponent())
    expect(component).toMatchSnapshot()
  })
  it('Should render correctly with mount', () => {
    const component = mount(getComponent())
    expect(component).toMatchSnapshot()
  })
})
