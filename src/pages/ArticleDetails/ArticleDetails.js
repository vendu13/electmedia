import { Box, CardMedia, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../Config/firebase'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
 
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon

} from "react-share";
import Loader from '../../Components/Loader/Loader'
import { toast } from 'react-toastify'
function ArticleDetails() {
    const [data,setData]=useState({})
    const [LoaderState, setLoaderState] = useState(false);
    const params=useParams()
     useEffect(() => {
       const getdata=async()=>{
          setLoaderState(true)
        const docRef = doc(db, "Articles", params.id);
        console.log(params)
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData(docSnap.data())
            // setData(false)

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            
          }
          setLoaderState(false)
        }
        getdata()
    }, [])

    // if(Object.keys(data).length<= 0)
    //     return <Box sx={{mt:"3vmax"}}>
    if(LoaderState){
      return <Loader/>
    }
    //         <Typography sx={{fontSize:"1.2vmax"}}>Data not found</Typography>
//         </Box>
  return (
    <>
    {Object.keys(data).length>0?
    
    
    <>
    <Box sx={{bgcolor:"white",p:"1vmax",boxShadow:14,m:"2vmax",mt:"3vmax"}}>
  {      console.log(data)}
        <Typography sx={{textTransform:"uppercase",fontWeight:500,fontSize:"1vmax"}}>{data?.tag}</Typography>
        <Typography sx={{fontSize:"1.4vmax",fontWeight:500,mt:1,mb:0.1}}>{data?.heading}</Typography>
        <Typography sx={{fontSize:"0.6vmax"}}>{moment(data?.createdAt?.seconds*1000).format("LL")}</Typography>
        <Box sx={{display:{sm:"none",xs:"flex"}}}>

<FacebookShareButton url={window.location.href}>
  <FacebookIcon style={{marginRight:"0.3vmax"}} size={10} round={true}/>
  </FacebookShareButton>
<LinkedinShareButton url={window.location.href}>
  <LinkedinIcon size={10}  style={{marginRight:"0.3vmax"}} round={true}/>
  </LinkedinShareButton>
<WhatsappShareButton url={window.location.href}>
  <WhatsappIcon size={10}  style={{marginRight:"0.3vmax"}} round={true}/>
  </WhatsappShareButton>
<TwitterShareButton url={window.location.href}>
  <TwitterIcon size={10}  style={{marginRight:"0.3vmax"}} round={true}/>
  </TwitterShareButton>
{/* <PinterestShareButton  media={data?.image} url={window.location.href}>
  <PinterestIcon size={10}  style={{marginRight:"0.3vmax"}} round={true}/>
  </PinterestShareButton> */}
  <Box  onClick={() =>  {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Copied to clipboard")
    }}>

<ShareRoundedIcon sx={{fontSize:"1.4vmax",cursor:"pointer"}}  />
</Box>

{/* <TwitterIcon size={32} round={true} /> */}
</Box>
        <CardMedia
         component="img"
        //  height="220vmax"
        width={"325"}
         image={data?.image ?data.image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"}
         alt=""
         sx={{mt:2,mb:1,height:{xs:"15vmax", sm:"20vmax"}}}
        />
        <Typography sx={{fontSize:"1.2vmax",fontWeight:500,mt:"1vmax",mb:"1.1vmax"}}>{data.alternateHeading}</Typography>
      
        <Typography sx={{fontSize:"1vmax"}}>{data?.body}</Typography>   
    </Box>
    <Box sx={{p:"1.6vmax",position:"fixed",left:0,top:"10vmax",display:{sm:"flex",xs:"none"},flexDirection:"column"}}>

    <FacebookShareButton url={window.location.href}>
      <FacebookIcon size={32} round={true}/>
      </FacebookShareButton>
    <LinkedinShareButton url={window.location.href}>
      <LinkedinIcon size={32} round={true}/>
      </LinkedinShareButton>
    <WhatsappShareButton url={window.location.href}>
      <WhatsappIcon size={32} round={true}/>
      </WhatsappShareButton>
    <TwitterShareButton url={window.location.href}>
      <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
    {/* <PinterestShareButton  media={data?.image} url={window.location.href}>
      <PinterestIcon size={32} round={true}/>
      </PinterestShareButton> */}
      <Box  onClick={() =>  {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Copied to clipboard")
        
        }}>

      <ShareRoundedIcon sx={{fontSize:"1.8vmax",cursor:"pointer"}}  />
      </Box>
    
    {/* <TwitterIcon size={32} round={true} /> */}
    </Box>
    </>

    :
    <Box sx={{mt:"3vmax"}}>
        <Typography sx={{fontSize:"1.2vmax"}}>Data not found</Typography>
        </Box>
}
    </>
  )
}

export default ArticleDetails