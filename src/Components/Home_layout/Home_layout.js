import { CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import CardBox from "../Cards/CardBox";
import Loader from "../Loader/Loader";
import BodyNav from "../Nav/BodyNav";

function Home_layout({ data }) {
  const [homeElem, sethomeElem] = useState({});
  const [HomeCategory, setHomeCategory] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
    getDocs(collection(db, "Articles")).then((snapData) => {
      let temp = {};
      snapData.forEach((elem) => {
        // const obj={}
        const d = elem.data();
        const category = d.tag;
        const cardDetail = {
          title: d.alternateHeading,
          image: d.image,
          timeStamp: d.createdAt,
          id: elem.id,
          tag: d.tag,
        };
        console.log(cardDetail);
        if (temp[category] === undefined) {
          temp = { ...temp, [category]: [cardDetail] };
        } else {
          temp[category].push(cardDetail);
        }
      });
      console.log(temp);
      sethomeElem(temp);
      setHomeCategory(Object.keys(temp));
      // console.log(temp);
      setloader(false);
    });
  }, []);

  //   if(Object.keys(data).length<= 0)
  // return <Box sx={{mt:"3vmax"}}>
  //     <Typography sx={{fontSize:"1.2vmax"}}>Data not found</Typography>
  //     </Box>
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {HomeCategory.length>0?  
      HomeCategory.map((elem) => {
        return (
          <Box>
            {/* {console.log("homeLayout",elem)} */}
            <BodyNav item={[elem]} />

            <Box
              sx={{
                minHeight: "17vmax",
                display: "flex",
                // overflow: "auto",
                flexWrap: "wrap",
                width: "100%",
                //   mt:1.8
              }}
            >
              {
                <CardBox
                  data={homeElem[elem]
                    .sort((a, b) =>
                      moment(a?.timeStamp?.seconds).diff(b?.timeStamp?.seconds)
                    )
                    .reverse()
                    .splice(0, 4)}
                />
              }

              {/* }).reverse(); */}
            </Box>
          </Box>
        );
      })
      :
      <Typography sx={{fontSize:"1.1vmax",mt:"2vmax"}}>No articles found</Typography>
    
    }
    </>
  );
}

export default Home_layout;
