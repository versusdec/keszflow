import React from 'react'
import { InvoiceForm } from '../Form'
import {
  fireEvent,
  render,
  cleanup,
  waitFor,
  act,
} from '@testing-library/react'
import { mount, shallow, ReactWrapper } from 'enzyme'
import { IInvoice, IItemInfo } from '../Create'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

afterEach(cleanup)

const defaultItem: IItemInfo = {
  pos: 0,
  name: '',
  unit: '',
  quantity: '',
  netPrice: '',
  taxRate: '',
  netAmount: '',
  taxAmount: '',
  grossAmount: '',
}
const fakeValues = {
  no: '100500',
  seller: {
    name: 'Konyaka',
    country: 'Poland',
    address_line_1: 's1',
    address_line_2: 's2',
    address_line_3: 's3',
  },
  buyer: {
    name: 'skotynyaka',
    country: 'Poland',
    address_line_1: 'b1',
    address_line_2: 'b2',
    address_line_3: 'b3',
  },
  dates: {
    issue: '20/07/2022',
    end: '20/07/2022',
    due: '20/07/2022',
  },
  payment: 'cash',
}

const props = {
  invoice: undefined,
}

describe('Invoice Form render', () => {
  const getComponent = () => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <InvoiceForm {...props} />
    </LocalizationProvider>
  )

  it('Should render correctly with Shallow', () => {
    const component = shallow(getComponent())
    expect(component).toMatchSnapshot()
  })

  it('Should render correctly with mount', () => {
    const component = mount(getComponent())
    expect(component).toMatchSnapshot()
  })
})

describe('render all inputs', () => {
  let no: HTMLInputElement | null,
    sellerName: HTMLInputElement | null,
    sellerAddress1: HTMLInputElement | null,
    sellerAddress2: HTMLInputElement | null,
    sellerAddress3: HTMLInputElement | null,
    sellerCountry: HTMLInputElement | null,
    buyerName: HTMLInputElement | null,
    buyerAddress1: HTMLInputElement | null,
    buyerAddress2: HTMLInputElement | null,
    buyerAddress3: HTMLInputElement | null,
    buyerCountry: HTMLInputElement | null,
    paymentMethod: HTMLInputElement | null,
    dueDate: HTMLInputElement | null,
    endDate: HTMLInputElement | null,
    issueDate: HTMLInputElement | null

  const getComponent = () => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <InvoiceForm {...props} />
    </LocalizationProvider>
  )

  beforeEach(() => {
    const { container } = render(getComponent())
    no = container.querySelector('input[name=no]')
    sellerName = container.querySelector('input[name="seller.name"]')
    sellerAddress1 = container.querySelector(
      'input[name="seller.address_line_1"]'
    )
    sellerAddress2 = container.querySelector(
      'input[name="seller.address_line_2"]'
    )
    sellerAddress3 = container.querySelector(
      'input[name="seller.address_line_3"]'
    )
    sellerCountry = container.querySelector('input[name="seller.name"]')
    buyerName = container.querySelector('input[name="buyer.name"]')
    buyerAddress1 = container.querySelector(
      'input[name="buyer.address_line_1"]'
    )
    buyerAddress2 = container.querySelector(
      'input[name="buyer.address_line_2"]'
    )
    buyerAddress3 = container.querySelector(
      'input[name="buyer.address_line_3"]'
    )
    buyerCountry = container.querySelector('input[name="buyer.name"]')
    paymentMethod = container.querySelector('input[name="payment"]')
    dueDate = container.querySelector('.dates_due input')
    issueDate = container.querySelector('.dates_issue input')
    endDate = container.querySelector('.dates_end input')
  })

  it('renders all inputs', () => {
    expect(no).toBeInTheDocument()
    expect(sellerName).toBeInTheDocument()
    expect(sellerAddress1).toBeInTheDocument()
    expect(sellerAddress2).toBeInTheDocument()
    expect(sellerAddress3).toBeInTheDocument()
    expect(sellerCountry).toBeInTheDocument()
    expect(buyerName).toBeInTheDocument()
    expect(buyerAddress1).toBeInTheDocument()
    expect(buyerAddress2).toBeInTheDocument()
    expect(buyerAddress3).toBeInTheDocument()
    expect(buyerCountry).toBeInTheDocument()
    expect(paymentMethod).toBeInTheDocument()
    expect(dueDate).toBeInTheDocument()
    expect(issueDate).toBeInTheDocument()
    expect(endDate).toBeInTheDocument()

    // expect(no?.value).toMatch('')
  })
})

describe('input values', () => {
  let no: ReactWrapper,
    sellerName: ReactWrapper,
    sellerAddress1: ReactWrapper,
    sellerAddress2: ReactWrapper,
    sellerAddress3: ReactWrapper,
    sellerCountry: ReactWrapper,
    buyerName: ReactWrapper,
    buyerAddress1: ReactWrapper,
    buyerAddress2: ReactWrapper,
    buyerAddress3: ReactWrapper,
    buyerCountry: ReactWrapper,
    paymentMethod: ReactWrapper,
    dueDate: ReactWrapper,
    endDate: ReactWrapper,
    issueDate: ReactWrapper

  const getComponent = () => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <InvoiceForm {...props} />
    </LocalizationProvider>
  )

  beforeEach(() => {
    const container = mount(getComponent())
    no = container.find('input[name="no"]')
    sellerName = container.find('input[name="seller.name"]')
    sellerAddress1 = container.find('input[name="seller.address_line_1"]')
    sellerAddress2 = container.find('input[name="seller.address_line_2"]')
    sellerAddress3 = container.find('input[name="seller.address_line_3"]')
    sellerCountry = container.find('input[name="seller.name"]')
    buyerName = container.find('input[name="buyer.name"]')
    buyerAddress1 = container.find('input[name="buyer.address_line_1"]')
    buyerAddress2 = container.find('input[name="buyer.address_line_2"]')
    buyerAddress3 = container.find('input[name="buyer.address_line_3"]')
    buyerCountry = container.find('input[name="buyer.name"]')
    paymentMethod = container.find('input[name="payment"]')
    dueDate = container.find('.dates_due input')
    issueDate = container.find('.dates_issue input')
    endDate = container.find('.dates_end input')
  })

  it('fill values', () => {
    no.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.no,
      },
    })
    sellerName.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.seller.name,
      },
    })
    sellerAddress1.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.seller.address_line_1,
      },
    })
    sellerAddress2.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.seller.address_line_2,
      },
    })
    sellerAddress3.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.seller.address_line_3,
      },
    })
    sellerCountry.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.seller.country,
      },
    })
    buyerName.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.buyer.name,
      },
    })
    buyerAddress1.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.buyer.address_line_1,
      },
    })
    buyerAddress2.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.buyer.address_line_2,
      },
    })
    buyerAddress3.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.buyer.address_line_3,
      },
    })
    buyerCountry.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.buyer.country,
      },
    })
    paymentMethod.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.payment,
      },
    })
    issueDate.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.dates.issue,
      },
    })
    endDate.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.dates.end,
      },
    })
    dueDate.simulate('change', {
      persist: () => {},
      target: {
        value: fakeValues.dates.due,
      },
    })
    expect(no.html()).toMatch(fakeValues.no)
  })
})

describe('FormComponent', () => {
  describe('Submitting form', () => {
    // Arrange--------------
    // Set up variables accessible in tests
    let container
    let no: HTMLInputElement,
      sellerName: HTMLInputElement,
      sellerAddress1: HTMLInputElement,
      sellerAddress2: HTMLInputElement,
      sellerAddress3: HTMLInputElement,
      sellerCountry: HTMLInputElement,
      buyerName: HTMLInputElement,
      buyerAddress1: HTMLInputElement,
      buyerAddress2: HTMLInputElement,
      buyerAddress3: HTMLInputElement,
      buyerCountry: HTMLInputElement,
      paymentMethod: HTMLInputElement,
      dueDate: HTMLInputElement,
      endDate: HTMLInputElement,
      issueDate: HTMLInputElement,
      form: HTMLFormElement,
      handleSubmit: () => void,
      fakeValues: IInvoice

    beforeEach(() => {
      // Here's my submitHandler mock that isn't getting called
      handleSubmit = jest.fn()

      const getComponent = () => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <InvoiceForm {...props} />
        </LocalizationProvider>
      )
      const wrapper = render(getComponent())
      container = wrapper.container

      fakeValues = {
        no: '100500',
        file: '',
        seller: {
          name: 'Konyaka',
          country: 'Poland',
          address_line_1: 's1',
          address_line_2: 's2',
          address_line_3: 's3',
        },
        buyer: {
          name: 'skotynyaka',
          country: 'Poland',
          address_line_1: 'b1',
          address_line_2: 'b2',
          address_line_3: 'b3',
        },
        dates: {
          issue: '20/07/2022',
          end: '20/07/2022',
          due: '20/07/2022',
        },
        payment: 'cash',
        items: [defaultItem],
      }
      no = container.querySelector('input[name="no"]') as HTMLInputElement
      sellerName = container.querySelector(
        'input[name="seller.name"]'
      ) as HTMLInputElement
      sellerAddress1 = container.querySelector(
        'input[name="seller.address_line_1"]'
      ) as HTMLInputElement
      sellerAddress2 = container.querySelector(
        'input[name="seller.address_line_2"]'
      ) as HTMLInputElement
      sellerAddress3 = container.querySelector(
        'input[name="seller.address_line_3"]'
      ) as HTMLInputElement
      sellerCountry = container.querySelector(
        'input[name="seller.name"]'
      ) as HTMLInputElement
      buyerName = container.querySelector(
        'input[name="buyer.name"]'
      ) as HTMLInputElement
      buyerAddress1 = container.querySelector(
        'input[name="buyer.address_line_1"]'
      ) as HTMLInputElement
      buyerAddress2 = container.querySelector(
        'input[name="buyer.address_line_2"]'
      ) as HTMLInputElement
      buyerAddress3 = container.querySelector(
        'input[name="buyer.address_line_3"]'
      ) as HTMLInputElement
      buyerCountry = container.querySelector(
        'input[name="buyer.name"]'
      ) as HTMLInputElement
      paymentMethod = container.querySelector(
        'input[name="payment"]'
      ) as HTMLInputElement
      dueDate = container.querySelector('.dates_due input') as HTMLInputElement
      issueDate = container.querySelector(
        '.dates_issue input'
      ) as HTMLInputElement
      endDate = container.querySelector('.dates_end input') as HTMLInputElement
      form = container.querySelector('form') as HTMLFormElement

      // Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(no, { target: { value: fakeValues.no } })
        fireEvent.change(sellerName, {
          target: { value: fakeValues.seller.name },
        })
        fireEvent.change(sellerAddress1, {
          target: { value: fakeValues.seller.address_line_1 },
        })
        fireEvent.change(sellerAddress2, {
          target: { value: fakeValues.seller.address_line_2 },
        })
        fireEvent.change(sellerAddress3, {
          target: { value: fakeValues.seller.address_line_3 },
        })
        fireEvent.change(sellerCountry, {
          target: { value: fakeValues.seller.country },
        })
        fireEvent.change(buyerName, {
          target: { value: fakeValues.buyer.name },
        })
        fireEvent.change(buyerAddress1, {
          target: { value: fakeValues.buyer.address_line_1 },
        })
        fireEvent.change(buyerAddress2, {
          target: { value: fakeValues.buyer.address_line_2 },
        })
        fireEvent.change(buyerAddress3, {
          target: { value: fakeValues.buyer.address_line_3 },
        })
        fireEvent.change(buyerCountry, {
          target: { value: fakeValues.buyer.country },
        })
        fireEvent.change(paymentMethod, {
          target: { value: fakeValues.payment },
        })
        fireEvent.change(issueDate, {
          target: { value: fakeValues.dates.issue },
        })
        fireEvent.change(dueDate, { target: { value: fakeValues.dates.due } })
        fireEvent.change(endDate, { target: { value: fakeValues.dates.end } })

        // This should submit the form?
        fireEvent.submit(form)
      })
    })

    test('Submit', async () => {
      // Assert--------------
      act(async () => {
        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledTimes(1)
          expect(handleSubmit).toHaveBeenCalledWith(fakeValues)
        })
      })
    })
  })
})
