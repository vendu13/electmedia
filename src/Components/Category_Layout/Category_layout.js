import { Box, Divider, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import CardBox from "../Cards/CardBox";
import Loader from "../Loader/Loader";

function Category_layout(props) {
  // const {navigation,route}=props
  const para = useParams();
  // console.log(para.label);
  const [categoryData, setCategoryData] = useState([]);
  const [latestData, setlatestData] = useState([]);
  const [trendingData, settrendingData] = useState([]);
  const [LoaderState, setLoaderState] = useState(false);
  const [tabIndex, settab] = useState(0);
  const fetch = async () => {
    const cardData = [];
    setLoaderState(true);
    const q = query(collection(db, "Articles"), where("tag", "==", para.label));

    const ticketDocsSnap = await getDocs(q);
    ticketDocsSnap.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      const d = doc.data();
      const cardDetail = {
        title: d.alternateHeading,
        image: d.image,
        timeStamp: d.createdAt,
        id: doc.id,
        tag: d.tag,
        isTrending:d.isTrending
      };
      cardData.push(cardDetail);
    });
    const allPosts = cardData.sort((a, b) => {
        return moment(a?.timeStamp?.seconds).diff(b?.timeStamp?.seconds);
      }).reverse();
    console.log(cardData.length);
    const trendingPosts = allPosts.filter((elem)=>elem.isTrending==="True")
      
    if (cardData.length <= 0) setCategoryData([]);
    else {
      setCategoryData(allPosts);
      setlatestData(allPosts.slice(0,3))
      settrendingData(trendingPosts)
    }
    setLoaderState(false);

  };

  

  useEffect(() => {
    // console.log("useEffect");
     fetch();

  }, [para.label]);
  // <Box sx={{ mt: 5 }}><Typography sx={{fontSize:"1vmax"}}> Article Not Found</Typography> {LoaderState}</Box>

  if (LoaderState)
    return <Loader/>

  

  const tabs = ["Latest", "Trending", "All"];
  return (
    <Box sx={{ mt: "2vmax" }}>
      <Typography
        sx={{ fontSize: "1.5vmax", textTransform: "capitalize", fontWeight: 500,color:"#49C5B6" }}
      >
        {para.label}
      </Typography>

      <Box style={{ display: "flex", marginTop: "2vmax" } }>
        {tabs?.map((elem,index) => (
            <Box  onClick={()=>settab(index)}>
            <Typography
                sx={{
                mr:"2vmax",
                fontSize: "1.3vmax",
                cursor: "pointer",
                textTransform: "capitalize",
                color: tabIndex === index?"black":"#dadada"
              
                }}

           
            >
                {elem}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ width: "90%", mt:" 1vmax", bgcolor: "#F8FFFE" }} />

      <Box style={{ display: "flex", flexWrap: "wrap", flexGrow: 1 }}>
        {console.log("kds",tabIndex)}
        {/* {categoryData.map(elem=><CardBox/>)}
         */}
        {tabIndex===0 &&
            <CardBox data={latestData} />
        } 
        {tabIndex===1 &&
            <CardBox data={trendingData} />
        }
        {tabIndex===2 &&
            <CardBox data={categoryData} />
        } 
      </Box>
    </Box>
  );
}

export default Category_layout;
