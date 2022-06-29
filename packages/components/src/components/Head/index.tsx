import Head from 'next/head'
import Favicon from '../Favicon'

const HeadJSX = ({ title }: { title?: string | undefined }) => (
  <Head>
    <title>{title ? title + ' | Keszflow' : 'Keszflow'} </title>
    <Favicon />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
  </Head>
)

export default HeadJSX
