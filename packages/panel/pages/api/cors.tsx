import fetch from 'isomorphic-unfetch'

const Cors = async (req: any, res: any) => {
  const { url } = req.query
  try {
    const resProxy = await fetch(url)
    res.status(200).send(resProxy.body)
  } catch (error) {
    // @ts-ignore
    res.status(400).send(error.toString())
  }
}

export default Cors
