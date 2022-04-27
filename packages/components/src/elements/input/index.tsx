import React, { PropsWithChildren } from 'react'
import {
  useField,
  FieldHookConfig,
  useFormik,
  FieldProps,
  getIn,
  Field,
} from 'formik'
import { TextFieldProps, TextField } from '@mui/material'

// import {} from '@mui/icons-material'

const CustomInput: React.FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form, ...rest } = props

  return (
    <>
      <TextField
        variant={props.variant || 'outlined'}
        error={error ?? Boolean(isTouched && errorMessage)}
        helperText={
          helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
        }
        {...rest}
        {...field}
      />
      {/*{error && <p>error</p>}*/}
    </>
  )
}

export const Input: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <>
      <Field {...props} component={CustomInput} />
    </>
  )
}
