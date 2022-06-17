import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FieldProps, getIn, Field, FastField } from 'formik'
import { TextFieldProps, TextField } from '@mui/material'

const CustomInput: React.FC<FieldProps & TextFieldProps> = (props) => {
  const [value, setValue] = useState('')
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form, ...rest } = props

  useEffect(() => {
    if (props.field.value) {
      setValue(props.field.value)
    } else {
      setValue('')
    }
  }, [props.field.value])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist()
      const newValue = event.target.value

      setValue(newValue)
    },
    []
  )

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
        value={value}
        onChange={handleOnChange}
        onBlur={() => {
          props.form.setFieldValue(props.field.name, value)
        }}
      />
    </>
  )
}

export const Input: React.FC<PropsWithChildren<any>> = (props) => {
  return props.fast ? (
    <FastField {...props} component={CustomInput} />
  ) : (
    <Field {...props} component={CustomInput} />
  )
}
