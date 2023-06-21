import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CardBox from "../../Components/Cards/CardBox";
import BodyNav from "../../Components/Nav/BodyNav";
import { db } from "../../Config/firebase";

function SearchPage() {
//   const params = useParams();

  const [searchParams]=useSearchParams()
  const params=searchParams.get("q")
  const location = useLocation()
  const [article, setarticle] = useState([]);
  const [searchedPost, setsearchedPost] = useState([]);
  const [SearchedHomeCategory, setSearchedHomeCategory] = useState([]);
  const getSearchResults = (query) => {
    let temp = {};
    console.log("query", query);
    const results = query.filter((elem) => {
      return checkArticle(elem) === true;
    });

    // console.log("searched posts",results)
    results.forEach((elem) => {
      const category = elem.tag;
      if (temp[category] === undefined) {
        temp = { ...temp, [category]: [elem] };
      } else {
        temp[category].push(elem);
      }
    });
    setsearchedPost(temp);
    setSearchedHomeCategory(Object.keys(temp));
  };
  const fetchArticles = async (query) => {
    const querySnapshot = await getDocs(collection(db, "Articles"));
    const articles = [];
    // const data=querySnapshot.data()

    querySnapshot.forEach((doc) => {
      //   console.log(doc.data())
      const d = doc.data();

      const cardDetail = {
        title: d.alternateHeading,
        image: d.image,
        timeStamp: d.createdAt,
        id: doc.id,
        tag: d.tag,
        isTrending: d.isTrending,
        alternateHeading: d.alternateHeading,
        body: d.body,
      };

      articles.push(cardDetail);
    });
    setarticle([...articles]);

    // console.log("searched",article)
    //     getSearchResults([...articles])
    //   console.log(searchedPost);
  };
  useEffect(() => {
    console.log("here", article);
    getSearchResults(article);
  }, [article]);

  const checkArticle = (elem) => {
    console.log("here");
    // console.log( elem.tag?.toLowerCase().includes(params.query?.toLowerCase()));
    // clg
    if (
      elem.body?.toLowerCase().includes(params?.toLowerCase()) ||
      elem.heading?.toLowerCase().includes(params?.toLowerCase()) ||
      elem.tag?.toLowerCase().includes(params?.toLowerCase()) ||
      elem.alternateHeading?.toLowerCase().includes(params?.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchArticles();
    console.log(location);
    // console.log(searchParams.get(q));
  }, [params]);

//   if(Object.keys(searchedPost).length<= 0)
//     return <Box sx={{mt:"3vmax"}}>
//         <Typography sx={{fontSize:"1.2vmax"}}>Data not found</Typography>
//         </Box>
  return (
    <Box sx={{ mt: "3vmax" }}>
      <Typography variant="h5" sx={{ fontSize: "1.3vmax" }}>
        Search Results
      </Typography>
      
      {/* <Box style={{display:"flex",flexWrap:"wrap",flexGrow:1}}> */}
      {/* searchedPost
       {console.log("search",searchedPost)} */}
      {/* <CardBox data={searchedPost}/> */}
      {/* </Box> */}
      <Box>
        
        {Object.keys(searchedPost).length> 0?
            SearchedHomeCategory?.map((elem) => {
            return(
          <Box>
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
                  data={searchedPost[elem]
                    .sort((a, b) =>
                      moment(a?.timeStamp?.seconds).diff(b?.timeStamp?.seconds)
                    )
                    .reverse()
                   }
                />
              }

              {/* }).reverse(); */}
            </Box>
          </Box>)
        }):

      (  <Box sx={{mt:"3vmax"}}>
        <Typography sx={{fontSize:"1.2vmax"}}>Data not found</Typography>
        </Box>)
    
    }
      </Box>
    </Box>
  );
}

export default SearchPage;
