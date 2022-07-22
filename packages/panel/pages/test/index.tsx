import React, { useState } from 'react'
import Link from 'next/link'

import { Document, Page } from 'react-pdf'

const Test = () => {
  const [file, setFile] = useState<String | ArrayBuffer | null>('/invoice.pdf')
  const [pages, setPages] = useState(false)

  function onFileChange(event: React.ChangeEvent<any>) {
    setFile(event.target.files[0])
    console.log(file)
  }
  function onDocumentLoadSuccess({ numPages }: any) {
    setPages(numPages)
  }
  return (
    <>
      <h1>TEST</h1>
      <Link href="/">HOME</Link>
      <br />
      <p>select file:</p>
      <input type="file" onChange={onFileChange} />

      <Document
        // item?.file || files[0]
        file={'/invoice.pdf'}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(pages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </>
  )
}

export default Test
