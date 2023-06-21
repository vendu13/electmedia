import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { fetchCategory } from "../../Store/Action/AdminActions/SectionActions/sectionAction";

function Categories() {
  const dispatch = useDispatch();
  const [cat, setcat] = useState([]);
  const params=useParams()
  useEffect(() => {
    getDocs(collection(db, "Categories")).then((snapData) => {
      const cata = [];
      // const data=querySnapshot.data()
      snapData.forEach((doc) => {
        console.log(doc.data());
        cata.push({ label: doc.data().label, id: doc.id });
      });

      setcat([...cata]);
    });
  }, [params.label]);

  return (
    <Box
      sx={{
        // width: "65%",
        // height: "70%",
        // bgcolor: "#FFFDFD",
        width:{xs:"100%",sm:"100%"},
        // bgcolor:"red",
        // ml: 10,
        mt:{xs:"2vmax",sm:"5vmax"},
        // boxShadow: 5,
      }}
    >
      {/* <Box> */}
      <Box
        sx={{
          // textAlign: "center",
          // p: 1.5,
          color: "#49C5B6",
          // color: "white",
          // fontSize: 16,
        }}
      >
        <Typography sx={{py:{sm:"1vmax",xs:"0.2vmax"},fontSize:'1.22vmax'}}>Categories</Typography>
      </Box>
      <Box
      sx={{height:{xs:"10%",sm:"50%"},overflow:"auto"}}
      >
        {cat?.map((elem, index) => {
          return (
            <Link
              key={index}
              to={`/category/${elem.label}`}
              style={{ textDecoration: "none" }}
            >
              {/* <Box  sx={{textAlign:'center',p:1.5,bgcolor:'white',color:'black',fontSize:16,borderBottomColor:"black",cursor:"pointer",mb:1,textTransform:"capitalize"}}>
            {elem.label}
         </Box> */}
              <Chip label={elem.label} size="small" sx={{mr:{sm:"0.5vmax",xs:"0.6vmax"},mb:{sm:"0.4vmax",xs:"0.6vmax"},bgcolor:elem.label===params.label?"#A8CCC8":"",  "&:hover":{
                    color:"green",
                    bgcolor:"red"
                    // scale:"2"
                }}} variant="outlined" clickable />
            </Link>
          );
        })}
      </Box>
      {/* </Box>  */}
    </Box>
  );
}

export default Categories;
