
import { db } from "../../../../Config/firebase";
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, updateDoc, query, where, Firestore, writeBatch } from "firebase/firestore"; 
import { FETCH_CATEGORIES, FETCH_POLICY, FETCH_SOCIAL_HANDLES, SECTION_LOADER } from "../../../Types/AdminType/sectionTypes";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const addCategory=(value,displayOnMenu)=>async (dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
    console.log("here")
    try{
    const docRef = await addDoc(collection(db, "Categories"), {
        label: value,
        createdAt:Timestamp.now(),
        updatedAt:Timestamp.now(),
        displayOnMenu:displayOnMenu
      });

      console.log("Document written with ID: ", docRef.id);
    }
    catch(e){
      console.log(e);
    }
    dispatch({
      type:SECTION_LOADER,
      sectionLoader:false
    })
}
export const addSocialLinks=(value)=>async (dispatch)=>{
    console.log("here")
    const docRef = await addDoc(collection(db, "SocialLinks"), {
        label: value,
        createdAt:Timestamp.now(),
        updatedAt:Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);
}

export const addPrivacyPolicies=({value,data})=>async (dispatch)=>{
    console.log("here")
    dispatch({
      type:SECTION_LOADER,
      sectionLoader:true
    })
    try{

    
    const docRef = await addDoc(collection(db, "Privacy Policies"), {
        label: value,
        body:data,
        createdAt:Timestamp.now(),
        updatedAt:Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);
    }catch(e)
    {
      console.log(e);
    }
    dispatch({
      type:SECTION_LOADER,
      sectionLoader:false
    })
}


export const addArticleAction=(payload)=>async (dispatch)=>{
    console.log("here")
    dispatch({
      type:SECTION_LOADER,
      sectionLoader:true
    })
    try{

      const {heading,subHead,category,body,img,isTrending}=payload
      // const image=await upload(img)
      
      // console.log(image)
     
      const docRef = await addDoc(collection(db, "Articles"), {
          heading ,
          alternateHeading:subHead,
          tag:category,
          body,
          reviews:[],
          image:img,
          isTrending:isTrending,
          createdAt:Timestamp.now(),
          updatedAt:Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
        // const image=upload(img)
        
    }
    catch(e){
      console.log(e);
    }
      dispatch({
        type:SECTION_LOADER,
        sectionLoader:false
      })
}

export const fetchPolicy=()=>async (dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  const fetchedPolicy=[]
  try{
    const querySnapshot = await getDocs(collection(db, "Privacy Policies"));
    // const data=querySnapshot.data()
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      fetchedPolicy.push({label:doc.data().label,id:doc.id,body:doc.data().body})
    });
    console.log(fetchedPolicy)
    dispatch({
      type:FETCH_POLICY,
      policy:fetchedPolicy
    })
  }
  catch(e){
      console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}
export const fetchCategory=()=>async (dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  const category=[]
  try{
    const querySnapshot = await getDocs(collection(db, "Categories"));
    // const data=querySnapshot.data()
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      category.push({label:doc.data().label,id:doc.id})
    });
    console.log(category)
    dispatch({
      type:FETCH_CATEGORIES,
      categories:category
    })
  }
  catch(e){
      console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}
export const fetchSocialHandles=()=>async (dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  const  handles=[]
  try{
    const querySnapshot = await getDocs(collection(db, "SocialLinks"));
    // const data=querySnapshot.data()
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      handles.push({handle:doc.data().handle,handleLink:doc.data().handleLink,id:doc.id})
    });
    console.log(handles)
    dispatch({
      type:FETCH_SOCIAL_HANDLES,
      socialHandles:handles
    })
  }
  catch(e){
      console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}
export const updatePrivacyPolicies=(payload)=>async(dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  try{
    const dataref= doc(db,"Privacy Policies",payload.id)
    await updateDoc(dataref, {
      label: payload.label,
      body:payload.body,
      updatedAt:Timestamp.now()
    });
    dispatch(fetchPolicy())
  }
  catch(e){
    console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}
export const updateHandleLinks=(val)=>async(dispatch)=>{
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  try{
    const dataref= doc(db,"SocialLinks",val.docid)
    await updateDoc(dataref, {
      handleLink: val.value,
      updatedAt:Timestamp.now()
    });
    dispatch(fetchSocialHandles())
  }
  catch(e){
    console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}

export const deletePostsFromArticle=(tag)=>async (dispatch)=>{
  const batch = writeBatch(db);
  console.log("deletePostsFromArticle");
  const q = query(collection(db, "Articles"), where("tag", "==", tag));
  const res= await getDocs(q)
  console.log("object",res);
  
 res.forEach(elem=>{
  const sfRef = doc(db, "Articles", elem.id);
  batch.delete(sfRef);
 })

 await batch.commit();
}
export const deleteCategory=(docid,tag)=>async (dispatch)=>{
  console.log(docid)
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  try{
    // console.log(tag);
    await deleteDoc(doc(db, "Categories",docid ));
    // await deletePostsFromArticle(tag)
    // const data=querySnapshot.data()
   dispatch(fetchCategory())
  }
  catch(e){
      console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}
export const deletePolicy=(docid)=>async (dispatch)=>{
  console.log(docid)
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:true
  })
  try{
    await deleteDoc(doc(db, "Privacy Policies",docid ));
    // const data=querySnapshot.data()
   dispatch(fetchPolicy())
  }
  catch(e){
      console.log(e)
  }
  dispatch({
    type:SECTION_LOADER,
    sectionLoader:false
  })
}

const upload=async (file)=>{
  const storage = getStorage();
const storageRef = ref(storage, file.name);
uploadBytes(storageRef, file).then((snapshot) => {
console.log('Uploaded a blob or file!',snapshot);
getDownloadURL(storageRef)
.then((url) => {
  // Insert url into an <img> tag to "download"
  console.log(url)
  return url
})
})}