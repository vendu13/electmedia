import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({value,label,handleChange,dataList,sx}) {
  const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(e)=>handleChange(e.target.value)}
          sx={sx}
        >
          {dataList.length>0?dataList.map((elem)=>  <MenuItem value={elem.label}>{elem.label}</MenuItem>)
            :
          <p>No category found</p>
        
        }
        {/* //   <MenuItem value={10}>Ten</MenuItem>
        //   <MenuItem value={20}>Twenty</MenuItem>
        //   <MenuItem value={30}>Thirty</MenuItem> */}
         </Select>
      </FormControl>
    </Box>
  );
}
