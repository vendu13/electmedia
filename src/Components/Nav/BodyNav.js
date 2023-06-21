import { Divider, Typography } from '@mui/material'
import React from 'react'
import css from './style.module.css'
function BodyNav({item,...props}) {
  console.log(css);
  return (
    <>
    <div style={{display:'flex',marginTop:'2vmax'}}>

      {item?.map((elem)=> <Typography sx={{mr:3,fontSize:"1.6vmax",cursor:'pointer',textTransform:"capitalize",}}>{elem}</Typography> )}
      
    </div>
    <Divider sx={{width:"90%",mt:"1vmax",bgcolor:"#F8FFFE"}}/>
    </>
  )
}

export default BodyNav