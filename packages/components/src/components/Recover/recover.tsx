import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { Input } from '@keszflow/components'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'

export const Recover = ({
  handleSubmit,
}: {
  handleSubmit: (values: any) => void
}) => {
  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required('This field is required'),
  })

  return (
    <Box data-testid={'recover'}>
      <Typography variant={'h3'} mb={3}>
        Recover password
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          handleSubmit(values)
          formikHelpers.setSubmitting(false)
        }}
      >
        {() => (
          <Form data-testid={'form'}>
            <Box sx={{}}>
              <Input
                inputProps={{ 'data-testid': 'email' }}
                label={'Email'}
                margin={'normal'}
                name={'email'}
                fullWidth
              />
              <Box>
                Return to <Link href={'/sign-in'}>login</Link> page
              </Box>
              <Button
                variant={'contained'}
                type={'submit'}
                sx={{ mt: 5 }}
                data-testid={'submit'}
              >
                send
              </Button>
              <Box sx={{ mt: 10 }}>
                Don&apos;t have an account?
                <Link href={'/sign-up'}> Sign up</Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

Recover.defaultProps = {
  title: 'Sign in',
}
