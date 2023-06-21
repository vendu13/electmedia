import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import React from 'react'
import sty from "./Loader.module.css"
function Loader() {
  return ( 
    <div className={sty.overlay}>
        {/* <div className={sty.spinner}></div> */}
          <CircularProgress />
     </div>
  )
}

export default Loader

// export default function Loader() {
//   return (
//     <Box sx={{ display: 'flex' ,bgcolor:"red",height:"90vh"}}>
     
//     </Box>
//   );
// }