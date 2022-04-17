export const useInvoices = () => {
  const invoices = [
    {
      id: 1,
      date: '2022.04.15',
      name: 'My invoice',
      total: 1500,
      status: 'active',
    },
    {
      id: 2,
      date: '2022.04.15',
      name: 'My invoice',
      total: 24158,
      status: 'active',
    },
    {
      id: 3,
      date: '2022.04.15',
      name: 'My invoice',
      total: 4561,
      status: 'active',
    },
    {
      id: 4,
      date: '2022.04.15',
      name: 'My invoice',
      total: 48945,
      status: 'active',
    },
    {
      id: 5,
      date: '2022.04.15',
      name: 'My invoice',
      total: 1245,
      status: 'active',
    },
  ]

  return {
    invoices,
  }
}
