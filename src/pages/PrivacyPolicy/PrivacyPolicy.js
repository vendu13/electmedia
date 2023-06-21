import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../Config/firebase';

function PrivacyPolicy() {
    const [data,setData]=useState("")
    const para=useParams()
    const fetch=async()=>{
        const q= query(
            collection(db, "Privacy Policies"),
            where("label", "==","Privacy Policy"),
          
          );


        const ticketDocsSnap= await  getDocs(q)
         
          ticketDocsSnap.forEach((doc)=>{
            console.log(doc.id, '=>', doc.data());
            setData(doc.data())  })    
        
    }
    useEffect(() => {
        fetch()
        
    }, [])
    
  return (
    <Box sx={{mt:"2.5vmax",boxShadow:15,p:"2.5vmax",width:"95%"}}>
        <Typography variant={'h5'} sx={{mb:"1.5vmax",fontSize:"1.5vmax"}}>{data?.label}</Typography>
        <Typography sx={{fontSize:"1vmax"}}>{data?.body}</Typography>

    </Box>
  )
}

export default PrivacyPolicy