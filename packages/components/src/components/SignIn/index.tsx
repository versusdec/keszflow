import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { Input } from '../../elements/input'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'

export const SignInJSX = () => {
  const initialValues = {
    login: '',
    password: '',
  }

  const validationSchema = Yup.object({
    login: Yup.string().email().required('This field is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('This field is required'),
  })

  return (
    <>
      <Typography variant={'h3'} mb={3}>
        SIGN IN
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          console.log(values)
          formikHelpers.setSubmitting(false)
        }}
      >
        {(formikProps: FormikProps<any>) => (
          <Form>
            <Box sx={{}}>
              <Input
                label={'Login'}
                margin={'normal'}
                name={'login'}
                fullWidth
              />
              <Input
                label={'Password'}
                margin={'normal'}
                name={'password'}
                type={'password'}
                fullWidth
              />
              <Box>
                <Link href={'/forgot'}>Forgot password?</Link>
              </Box>
              <Button variant={'contained'} type={'submit'} sx={{ mt: 5 }}>
                SIGN IN
              </Button>
              <Box sx={{ mt: 10 }}>
                Don&apos;t have an account?
                <Link href={'/sign-up'}> Sign up</Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  )
}
