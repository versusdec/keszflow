import React, { useState } from 'react'
import Link from 'next/link'

import Sortable from '@keszflow/components/src/components/Sortable'
import { Box, Paper, IconButton, Stack } from '@mui/material'
import { AppsOutlined } from '@mui/icons-material'

const items = [
  {
    pos: 0,
    name: '1',
    unit: 'kg',
    quantity: 10,
    netPrice: 125,
    taxRate: '',
    netAmount: '',
    taxAmount: '',
    grossAmount: '',
  },
  {
    pos: 1,
    name: '2',
    unit: 'pcs',
    quantity: 12,
    netPrice: 1232,
    taxRate: '',
    netAmount: '',
    taxAmount: '',
    grossAmount: '',
  },
  {
    pos: 2,
    name: '3',
    unit: 'hrs',
    quantity: 43,
    netPrice: 23,
    taxRate: '',
    netAmount: '',
    taxAmount: '',
    grossAmount: '',
  },
  {
    pos: 3,
    name: '4',
    unit: 'gr',
    quantity: 123,
    netPrice: 435,
    taxRate: '',
    netAmount: '',
    taxAmount: '',
    grossAmount: '',
  },
  {
    pos: 4,
    name: '5',
    unit: 'ml',
    quantity: 250,
    netPrice: 50,
    taxRate: '',
    netAmount: '',
    taxAmount: '',
    grossAmount: '',
  },
]

const Test = () => {
  const [file, setFile] = useState<String | ArrayBuffer | null>('/invoice.pdf')

  function onFileChange(event: React.ChangeEvent<any>) {
    setFile(event.target.files[0])
    console.log(file)
  }

  const itemJSX = ({ item }: any) => {
    return (
      <Box component={Paper} p={2} mb={2}>
        <Stack spacing={2} direction={'row'} alignItems={'center'}>
          <Box>
            <IconButton size={'small'}>
              <AppsOutlined fontSize={'small'} />
            </IconButton>
          </Box>
          <Box>
            <Box>Name: {item.name}</Box>
          </Box>
        </Stack>
      </Box>
    )
  }

  return (
    <>
      <h1>TEST</h1>
      <Link href="/">HOME</Link>
      <br />
      <p>select file:</p>
      <input type="file" onChange={onFileChange} />

      <Sortable items={items} Component={itemJSX} />
    </>
  )
}

export default Test
