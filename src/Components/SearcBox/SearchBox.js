import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { ClickAwayListener, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getSuggestedQuery } from "@testing-library/react";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../TextInput";
import { createSearchParams, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export default function SearcBox() {
  const classes = useStyles();
const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [query, setquery] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(true);
    setquery("")
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleSearch = () => {
    if(query.length>0){
      
    
    // navigate(`/search?q=${createSearchParams(query)}`)
    navigate({
        pathname:"/search",
        search:`?q=${query}`
    })}
    else{
        alert("Please Enter Search Query")
    }
    setquery("")
  };
  const handleClickAway = () => {
    setAnchorEl(false)
  };

  return (
    <div>
      <ClickAwayListener onClickAway={()=>handleClickAway()}>
        <div>

        <Button
          aria-describedby={id}
          variant="contained"
          sx={{ fontSize: "1.2vmax" }}
          onClick={handleClick}
        >
          Search
        </Button>
        {anchorEl ?
        <Paper
          sx={{
            position: "absolute",
            right: "2vmax",
            height: "3.5vmax",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "0.5vmax",
            borderRadius: "0.3vmax",
          }}
        >
          {/* <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> */}

          {/* <TextField size='small' value={query} sx={{height:"0.8vmax",width:"15vmax",fontSize:"1vmax"}} onChange={(e)=>setquery(e.target.value)} /> */}
          <input
            value={query}
            onChange={(e) => setquery(e.target.value)}
            style={{
              borderWidth: "0.1vmax",
              outline: "none",
              height: "2vmax",
              width: "12vmax",
              borderRadius: "0.2vmax",
              padding: "0.2vmax",
              fontSize:"1vmax",
            }}
            type="text"
          />
          <Box onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "1.4vmax", ml: "0.3vmax" ,cursor:"pointer","&:hover":{color:"#49C5B6"}}} />
          </Box>

          {/* </div> */}
        </Paper>:<div></div>}
        </div>
      </ClickAwayListener>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: "MuiPopover-paper" }}
        sx={{height:"6vmax",width:"20vmax",p:"0"}}
        sx={{"&.MuiPopover-paper":{
            height:10
        }}}
      > 
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <TextField size='small' value={query} sx={{p:"0.5vmax",height:"5vmax",width:"20vmax"}} onChange={(e)=>setquery(e.target.value)} />
            <div style={{marginLeft:"1vmax",cursor:"pointer"}}  onClick={()=>handleSearch(query)}>

            <SearchIcon />
            </div>
        </div>
      
      </Popover> */}
    </div>
  );
}
