import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {  useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate=useNavigate()
    const handleNav=()=>{
            navigate("/")
    }
  return (
    <Box sx={{height:"80%",display:"flex",flexDirection:"column",justifyContent:"flex-start",p:"2vmax"}} >
        <Typography variant = "h3" sx={{fontSize:"2.5vmax", color:"#232323",mt:"3vmax"}}>404 Page not found...</Typography>
        <Box>

        <Button sx={{px:"0.5vmax",py:"0.5vmax",bgcolor:"#49C5B6",mt:"1vmax",color:"white",fontSize:"0.7vmax","&:hover":{bgcolor:"#86C4BD"}} } onClick={handleNav}>Back To Home</Button>
        </Box>
    </Box>
  )
}

export default PageNotFound