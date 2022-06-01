import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import type { FC } from 'react'
import { View } from '@keszflow/components'
import Link from 'next/link'

import Sortable from '@keszflow/components/src/components/Sortable'
import { Box, Paper, TextField } from '@mui/material'
import { Input } from '@keszflow/components/src/elements/input'

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
  const itemJSX = ({ item }: any) => {
    return (
      <Box component={Paper} p={2} mb={2}>
        <Box>Name: {item.name}</Box>
        <TextField defaultValue={item.unit} label="Unit" variant="outlined" />
      </Box>
    )
  }

  const handleChange = (items: any[]) => {
    console.log(items)
  }

  return (
    <>
      <h1>TEST</h1>
      <Link href="/">HOME</Link>
      <br />

      <Sortable items={items} Component={itemJSX} />
    </>
  )
}

Test.getLayout = function getLayout(page: ReactElement) {
  return <View title={'Test'}>{page}</View>
}

export default Test
