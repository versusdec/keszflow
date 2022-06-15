import React from 'react'
import { Box, Typography, Drawer, Button } from '@mui/material'
import Link from 'next/link'
// import {Logout, AccountCircle} from '@mui/icons-material'
// import Image from 'next/image'
import { Input } from '../../elements/input'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'

export const SignInJSX = () => {
  const drawerWidth = 375

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
                    Don't have an account?{' '}
                    <Link href={'/sign-up'}>Sign up</Link>
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
