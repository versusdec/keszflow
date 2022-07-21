import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { Input } from '../../elements/input'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'

export const SignUpJSX = ({
  handleSubmit,
}: {
  handleSubmit: (values: any) => void
}) => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required('This field is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('This field is required'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })

  return (
    <Box data-testid={'signup'}>
      <Typography variant={'h3'} mb={3}>
        SIGN UP
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          console.log(values)
          handleSubmit(values)
          formikHelpers.setSubmitting(false)
        }}
      >
        {(formikProps: FormikProps<any>) => (
          <Form data-testid={'form'}>
            <Box sx={{}}>
              <Input
                inputProps={{
                  'data-testid': 'email',
                }}
                label={'Email'}
                margin={'normal'}
                name={'email'}
                fullWidth
              />
              <Input
                inputProps={{
                  'data-testid': 'password',
                }}
                label={'Password'}
                margin={'normal'}
                name={'password'}
                type={'password'}
                fullWidth
              />
              <Input
                inputProps={{
                  'data-testid': 'confirmPassword',
                }}
                label={'Confirm Password'}
                margin={'normal'}
                name={'confirmPassword'}
                type={'password'}
                fullWidth
              />

              <Box>
                <Typography variant={'caption'}>
                  By pressing the button you confirm our{' '}
                  <Link href={'#'}>Terms and Conditions</Link>,{' '}
                  <Link href={'#'}>Privacy Policy</Link> and{' '}
                  <Link href={'#'}>Rules</Link> of our service.
                </Typography>
              </Box>
              <Button
                data-testid={'submit'}
                variant={'contained'}
                type={'submit'}
                sx={{ mt: 3 }}
              >
                SIGN UP
              </Button>
              <Box sx={{ mt: 10 }}>
                Already have account? <Link href={'/sign-in'}>Sign in</Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
