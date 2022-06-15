import React from 'react'
import { Box, Typography, Drawer, Button } from '@mui/material'
import Link from 'next/link'
// import {Logout, AccountCircle} from '@mui/icons-material'
// import Image from 'next/image'
import { Input } from '../../elements/input'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'

export const SignUpJSX = () => {
  const drawerWidth = 375

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
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          display: 'flex',
          flexGrow: 1,
          bgcolor: 'action.focus',
        }}
      >
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            maxWidth: drawerWidth,
            width: '100%',
            '& .MuiDrawer-paper': {
              maxWidth: drawerWidth,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3,
            },
          }}
        >
          <Typography variant={'h3'} mb={3}>
            SIGN UP
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
                    label={'Email'}
                    margin={'normal'}
                    name={'email'}
                    fullWidth
                  />
                  <Input
                    label={'Password'}
                    margin={'normal'}
                    name={'password'}
                    type={'password'}
                    fullWidth
                  />
                  <Input
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
                  <Button variant={'contained'} type={'submit'} sx={{ mt: 3 }}>
                    SIGN UP
                  </Button>
                  <Box sx={{ mt: 10 }}>
                    Already have account? <Link href={'/sign-in'}>Sign in</Link>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Drawer>
        <Box
          sx={{
            width: '66%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 365,
            }}
          >
            <img
              src={'/img/keszflow_logo_full.png'}
              style={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
