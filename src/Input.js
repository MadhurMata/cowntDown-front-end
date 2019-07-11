import React from 'react'
import TextField from '@material-ui/core/TextField';


export default function Input(props) {
  const { label, name, value, onChange } = props
  return (
    <div>
       <TextField
        id="outlined-dense"
        label={label}
        className="textField dense"
        margin="dense"
        variant="outlined"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}