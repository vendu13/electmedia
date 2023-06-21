import React, { useEffect } from "react";
import { Box } from "@mui/system";
import BodyNav from "../../Components/Nav/BodyNav";
import SearchAppBar from "../../Components/Nav/Navbar";
import Grid from "@mui/material/Grid";
import Categories from "../../Components/Categories/Categories";
import { CardMedia } from "@mui/material";
import CardBox from "../../Components/Cards/CardBox";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../Components/Home_layout/Footer";
function Layout() {
  return (
    <>
      <SearchAppBar />
      <Box
        sx={{
          px: "6.5vmax",
          mt: 5,
          display: "flex",
          flexDirection: { xs:"column-reverse", sm: "row" }, 
          // bgcolor:"red"     
        }}
      >
       

        <Box sx={{ py: 2, minHeight: "80vh",width:{sm:"90%"}, }}>
          <Outlet />
        </Box>
        <Box
          sx={{
            display: {sm:"flex",xs:"block"},
            // justifyContent: "center",
            // alignItems: "center",
            // height: "90vh",
            width:{sm:"22%"},
            flexWrap:"wrap",
            p:"1vmax"
            
          }}
        >
          <Categories />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
