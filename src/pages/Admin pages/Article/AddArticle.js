import {
  Box,
  Button,
  Card,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import MultipleSelect from "../../../Components/MultiSelect";
import BasicSelect from "../../../Components/SelectInput";
import TextInput from "../../../Components/TextInput";
import {
  addArticleAction,
  fetchCategory,
} from "../../../Store/Action/AdminActions/SectionActions/sectionAction";
// import MenuItem from '@mui/material/MenuItem';

function AddArticle() {
  const [heading, setHeading] = useState("");
  const [subHead, setSubhead] = useState("");
  const [category, setcategory] = useState("");
  const [isTrending, setisTrending] = useState("");
  const [imageLoader, setimageLoader] = useState(false);
  const [body, setBody] = React.useState("");
  const [img, setImg] = React.useState("");
  const [imgname, setImgName] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const { categories, sectionLoader } = useSelector(
    (state) => state.navSection
  );
  const upload = async (file) => {
    
      try{
    if(file){
        setimageLoader(true)
        const storage = getStorage();
        const storageRef = ref(storage, "img/" + file.name);
    
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          getDownloadURL(storageRef).then((url) => {
            // Insert url into an <img> tag to "download"
            console.log(url);
            setImg(url);
            setimageLoader(false)
          });
    
        });
    
}}catch(err){
    if(file){
        setimageLoader(false)
    }
}
  };
  const handleArticle = async () => {
    console.log("first");
    // const image=await upload(img)

    dispatch(
      addArticleAction({ heading, subHead, category, body, img, isTrending })
    );
    setHeading("");
    setSubhead("");
    setcategory("");
    setBody("");
    setImg("");
    setImgName("")
    setisTrending("");
  };
//   if(imageLoader)
  if (sectionLoader || imageLoader) {
    return <Loader />;
  }

  return (
    <>
      <Card elevation={3} sx={{ width: "100%", mt: -4, mb: 3, px: 2, py: 2 }}>
        <p>Add Article</p>
      </Card>
      <Card
        elevation={3}
        sx={{
          width: "100%",
          minHeight: "20vmax",
          pt: "20px",
          mb: 3,
          px: 3,
          py: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <TextInput
            label="Headline"
            value={heading}
            handleChange={(val) => setHeading(val.target.value)}
            // style={{width:"60vw"}}
            sx={{ width: "100%", mb: 4 }}
          />
          <TextInput
            label="Alternative Headline"
            value={subHead}
            handleChange={(val) => setSubhead(val.target.value)}
            // style={{width:"60vw"}}
            sx={{ width: "100%", mb: 4 }}
          />

          <TextInput
            label="Article Body"
            value={body}
            handleChange={(val) => setBody(val.target.value)}
            // style={{width:"60vw"}}
            sx={{ width: "100%", mb: 4 }}
            rows={10}
            multiline
          />

{/* <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
        /> */}
          <BasicSelect
            label="Select Category"
            value={category}
            handleChange={(val) => setcategory(val)}
            dataList={categories || []}
            sx={{ mb: 4 }}
          />
          <BasicSelect
            label="Trending"
            value={isTrending}
            handleChange={(val) => setisTrending(val)}
            dataList={[
              { label: "True", value: "True" },
              { label: "False", value: "False" },
            ]}
            sx={{ mb: 4 }}
          />

          <Typography>{imgname.name}</Typography>
          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              accept="image/*"
              multiple
              onChange={(e) => {
                setImgName(e.target.files[0]);
                upload(e.target.files[0]);
              }}
              type="file"
            />
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="success"
            variant="contained"
            sx={{ px: 4, py: 1, width: "10vmax" ,mt:"1vmax"}}
            onClick={() => handleArticle()}
          >
            Add
          </Button>
        </div>
      </Card>
    </>
  );
}

export default AddArticle;
