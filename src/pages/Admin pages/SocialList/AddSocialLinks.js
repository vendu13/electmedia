import { Box, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextInput from '../../../Components/TextInput'
import { addCategory, addSocialLinks } from '../../../Store/Action/AdminActions/SectionActions/sectionAction'

function AddSocialLinks() {
    const [link, setlink] = useState("")
    const dispatch=useDispatch()
  return (
    <Card  elevation={3} sx={{width:"100%",height :"12vmax",pt:'20px',mb:3,px:3,py:3,display:'flex',flexDirection:"column",justifyContent:"space-around"}}>
        <p>Add Social Links</p>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"2vmax"}}>
        <TextInput
            label="Links"
            value={link}
            handleChange={(val)=>setlink(val.target.value)}
            // style={{width:"60vw"}}
            sx={{width:"80%"}}
        />
     <Button color="success" variant="contained" onClick={()=>dispatch(addSocialLinks(link))} sx={{ px: 3, py: 0.5 }}>Add</Button>
        </div>
    </Card>
  )
}

export default AddSocialLinks