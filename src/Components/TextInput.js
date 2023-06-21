import { TextField } from '@mui/material'
import React from 'react'

function TextInput(props) {
    console.log(props);
  const {label,value,handleChange,sx,select,selectProps}=props
  return (
    <TextField
    id="outlined-name"
    label={label}
    value={value}
    onChange={(val)=>handleChange(val)}
    variant="outlined"
    sx={sx}
    multiline={props.multiline || false}
    style={{padding:0}}
    select={select || false}
    SelectProps={selectProps || {}}
    rows={props?.rows}
    disabled={props.disabled===true ? true : false}
  />
  )
}

export default TextInput