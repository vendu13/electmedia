import { Box, Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import MyStatefulEditor from '../../../Components/RichTextEditor'
// import RichTextEditor from 'react-rte/lib/RichTextEditor'


import TextInput from '../../../Components/TextInput'
import { addPrivacyPolicies, updatePrivacyPolicies } from '../../../Store/Action/AdminActions/SectionActions/sectionAction'
import { useNavigate, useParams } from "react-router-dom";
function EditPrivacyTerms(props) {
    const [content, setcontent] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()



    const { policies, sectionLoader } = useSelector(
        state => state.navSection
    )


    // console.log(id);
    useEffect(() => {
        const temp = policies.filter((data) => data.id === id)
        setcontent(temp[0])
    }, [])


    const updateHandler=()=>{
        dispatch(updatePrivacyPolicies(content))
        navigate("/api/v1/admin/privacy")
    }

    return (
        <>

            <Card elevation={3} sx={{ width: "100%", mb: 3, px: 3, py: 3,mt:-3}}>
                <p style={{ fontSize: "1.2vmax" }}>Edit Privacy Policies</p>
            </Card>
            <Card elevation={3} sx={{ width: "100%", minHeight: "25vmax", pt: '20px', mb: 3, px: 3, py: 3, display: 'flex', flexDirection: "column", justifyContent: "space-around" }}>


                <div>
                    <TextInput
                        label="Policy Label"
                        value={content.label}
                        handleChange={(val) => setcontent({...content,label:val.target.value})}
                        // style={{width:"60vw"}}
                        disabled={true}
                        sx={{ width: "100%", mb: 4 }}
                    />
                    <TextInput
                        label="Body"
                        value={content.body}
                        handleChange={(val) =>  setcontent({...content,body:val.target.value})}
                        // style={{width:"60vw"}}
                        sx={{ width: "100%", mb: 4 }}
                        multiline={true}
                        rows={10}
                    />
                    {/* <MyStatefulEditor
        // value={this.state.value}
        // onChange={this.onChange}
      /> */}

                </div>
                <div style={{ display: 'flex', justifyContent: "center" }}>

                    <Button color="success" variant="contained" onClick={() => updateHandler()} sx={{ px: 3, py: 0.5, width: "10%" }}>Update</Button>
                </div>
            </Card>
        </>
    )
}

export default EditPrivacyTerms