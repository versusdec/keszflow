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
import { Box, Paper, TextField, IconButton, Stack } from '@mui/material'
import { AppsOutlined } from '@mui/icons-material'
import { Input } from '@keszflow/components/src/elements/input'
import { Document, Page, pdfjs } from 'react-pdf'

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
  const [file, setFile] = useState<String | ArrayBuffer | null>(null)
  const [numPages, setNumPages] = useState<any>(null)

  function onFileChange(event: React.ChangeEvent<any>) {
    setFile(event.target.files[0])
    console.log(file)
  }

  function onDocumentLoadSuccess({ numPages }: any) {
    console.log(numPages)
    setNumPages(numPages)
  }
  // console.log(file);

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
      <br />
      <br />
      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
      <br />
      <Sortable items={items} Component={itemJSX} />
    </>
  )
}

Test.getLayout = function getLayout(page: ReactElement) {
  return <View title={'Test'}>{page}</View>
}

export default Test
