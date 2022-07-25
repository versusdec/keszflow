import React from 'react'
import { IList, InvoiceList } from '../List'

import { fireEvent, render, screen } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import { invoiceData } from '@keszflow/panel/hooks/useInvoices'

describe('Invoice List', () => {
  /* const defaultQueryFn = async ({
                                  queryKey,
                                }: {
    queryKey: readonly unknown[] | [string]
  }) => {
    const res = await fetch(`https://api.dev.keszflow.business/${queryKey[0]}`)
    return res.json()
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
  })
  const wrapper = ({children}: {children: PropsWithChildren<any>}) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const { result, waitFor } = renderHook(() => useInvoices(), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(useInvoicesResponse); */

  // jest.mock('useInvoices')

  // let response;
  /*  beforeEach(()=>{
      response = {
        data: useInvoicesData,
        isFetching: false,
        isError: false
      }
    })

    test('get invoice data', ()=>{
      // const mockUseQuery = (useInvoices as jest.MockedFunction<typeof useInvoices>).mockReturnValue(useInvoicesData)
      const ads = useInvoices()
      ad
      // expect(data).toBe(useInvoicesData)
    }) */

  let useInvoicesData: invoiceData[]
  let handler: (id: number, type: string) => void
  const getComponent = ({ invoices, openInvoiceHandler }: IList) => (
    <InvoiceList invoices={invoices} openInvoiceHandler={openInvoiceHandler} />
  )

  beforeEach(() => {
    useInvoicesData = [
      {
        id: 1,
        date: '2022-05-14T21:00:00.000Z',
        name: 'My Fancy invoice #1',
        total: 1500,
        status: 'active',
        type: 'created',
      },
      {
        id: 2,
        date: '2022-06-09T21:00:00.000Z',
        name: 'Another one',
        total: 24158,
        status: 'active',
        type: 'created',
      },
      {
        id: 3,
        date: '2022-06-09T21:00:00.000Z',
        name: 'And another',
        total: 4561,
        status: 'active',
        type: 'created',
      },
      {
        id: 4,
        date: '2022-07-09T21:00:00.000Z',
        name: 'Geez thats alot',
        total: 48945,
        status: 'active',
        type: 'created',
      },
      {
        id: 5,
        date: '2022-07-09T21:00:00.000Z',
        name: 'Somebody stop me!',
        total: 1245,
        status: 'active',
        type: 'created',
      },
      {
        id: 6,
        date: '2022-08-09T21:00:00.000Z',
        name: 'Uploaded Invoice #1',
        total: 15488,
        status: 'active',
        type: 'uploaded',
      },
    ]
    handler = jest.fn()
  })

  it('Should render correctly with Shallow', () => {
    const component = shallow(
      getComponent({ invoices: [], openInvoiceHandler: handler })
    )
    expect(component).toMatchSnapshot()
  })
  it('Should render correctly with mount', () => {
    const component = mount(
      getComponent({ invoices: [], openInvoiceHandler: handler })
    )
    expect(component).toMatchSnapshot()
  })

  test('open invoice modal btn click', () => {
    render(
      getComponent({ invoices: useInvoicesData, openInvoiceHandler: handler })
    )
    useInvoicesData.forEach((item, i) => {
      const listItem = screen.getByTestId(`list_item_${item.id}`)
      const itemOpenIcon = screen.getByTestId(`open_${item.id}`)
      expect(listItem).toBeInTheDocument()
      expect(itemOpenIcon).toBeInTheDocument()
      fireEvent.click(itemOpenIcon)
      expect(handler).toHaveBeenCalledTimes(i + 1)
      expect(handler).toHaveBeenCalledWith(item.id, item.type)
    })
  })
})
