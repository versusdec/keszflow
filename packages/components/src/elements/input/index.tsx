import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FieldProps, getIn, Field, FastField } from 'formik'
import { TextFieldProps, TextField, Box, MenuItem } from '@mui/material'

interface IOption {
  label: string
  value: string | number
}

interface IOptions {
  options: IOption[]
  adornment?: any
  select?: boolean
}

const CustomInput: React.FC<FieldProps & TextFieldProps & IOptions> = (
  props
) => {
  const [value, setValue] = useState('')
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form, select, options, ...rest } = props

  useEffect(() => {
    if (props.field.value) {
      setValue(props.field.value)
    } else {
      setValue('')
    }
  }, [props.field.value])

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setValue(newValue)
    },
    []
  )

  const FieldJSX = (
    <TextField
      select={select}
      variant={props.variant || 'outlined'}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...field}
      {...rest}
      value={value}
      onChange={handleOnChange}
      onBlur={() => {
        props.form.setFieldValue(props.field.name, value)
      }}
      sx={{
        '& .MuiSelect-select': {
          paddingRight: props.adornment?.endAdornment
            ? '70px!important'
            : 'inherit',
        },
      }}
    >
      {options &&
        options.map((option: IOption) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )
        })}
    </TextField>
  )

  return (
    <>
      {props.adornment?.endAdornment && (
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            maxWidth: '210px',
          }}
        >
          {FieldJSX}
          {props.adornment?.endAdornment && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: '30px',
              }}
            >
              {props.adornment.endAdornment}
            </Box>
          )}
        </Box>
      )}
      {!props.adornment?.endAdornment && FieldJSX}
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
