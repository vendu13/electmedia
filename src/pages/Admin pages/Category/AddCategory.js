import { Box, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../Components/Loader/Loader'
import BasicSelect from '../../../Components/SelectInput'
import TextInput from '../../../Components/TextInput'
import { addCategory } from '../../../Store/Action/AdminActions/SectionActions/sectionAction'

function AddCategory() {
    const [cat, setcat] = useState("")
    const [displayOnMenu, setdisplayOnMenu] = useState("")
    const dispatch=useDispatch()
    const {categories,sectionLoader}=useSelector(
      state=>state.navSection
    )
    const addCategoryHandler=()=>{
        console.log(cat)
        dispatch(addCategory(cat,displayOnMenu))
        setcat("")
        setdisplayOnMenu("")
    }
    if(sectionLoader){
      return <Loader/>
    }
  return (
    <Card  elevation={3} sx={{width:"100%",height :"25vmax",pt:'20px',px:3,py:3,display:'flex',flexDirection:"column",justifyContent:"space-around"}}>
        <p>Add Category</p>
        <div >
        <TextInput
            label="Category"
            value={cat}
            handleChange={(val)=>setcat(val.target.value)}
            // style={{width:"60vw"}}
            sx={{width:"100%",mb:"2vmax"}}
        />
     <BasicSelect
            label="Display On Menu"
            value={displayOnMenu}
            handleChange={(val) => setdisplayOnMenu(val)}
            dataList={[
              { label: "True", value: "True" },
              { label: "False", value: "False" },
            ]}
            sx={{ mb: 4 }}
          />
     <Button color="success" variant="contained" sx={{ px: 3, py: 0.5 }} onClick={()=>addCategoryHandler()}>Add</Button>
        </div>
    </Card>
  )
}

export default AddCategory