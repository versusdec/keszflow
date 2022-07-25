import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { Input } from '@keszflow/components'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'

export const Password = ({
  handleSubmit,
}: {
  handleSubmit: (values: { password: string; confirmPassword: string }) => void
}) => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Enter password'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })

  return (
    <Box data-testid={'password'}>
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
                inputProps={{ 'data-testid': 'password' }}
                type={'password'}
                label={'Enter new password'}
                margin={'normal'}
                name={'password'}
                fullWidth
              />
              <Input
                inputProps={{ 'data-testid': 'confirmPassword' }}
                label={'Confirm password'}
                type={'password'}
                margin={'normal'}
                name={'confirmPassword'}
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

Password.defaultProps = {
  title: 'Sign in',
}
