import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Paragraph } from '../../../Components/Typography';
import EditIcon from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import TextInput from '../../../Components/TextInput';
import { useEffect, useState } from 'react';
import { fetchSocialHandles, updateHandleLinks } from '../../../Store/Action/AdminActions/SectionActions/sectionAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader/Loader';
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 200,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const SocialList = () => {
  // const { palette } = useTheme();
  const bgError = "#FF3D57";
  const bgPrimary = '#1976d2';
  const bgSecondary = '#FFAF38';
  const [isEdit, setisEdit] = useState(false)
  const [val, setval] = useState({})
  const dispatch=useDispatch()
  useEffect(() => {
   dispatch( fetchSocialHandles())
  
  }, [])
  const {socialHandles,sectionLoader}=useSelector(
    state=>state.navSection
  )
const toggleHandler=(val,docid)=>{
  // if(toggle[index]){
  //     toggle[index]=val
  // }else{
  //   toggle[index]=!val
  // }
  setisEdit(true)
  console.log(val);
  setval({value:val,docid:docid})
} 
// console.log(object);
const updateHandler=(data,id)=>{
//  setval(val) 
dispatch(updateHandleLinks(val))
setval("")
setisEdit(false)
}
console.log(socialHandles)
if(sectionLoader){
  return <Loader/>
}
  return (
    <>
{    isEdit &&
    (<Card sx={{px:2,py:2,mb:2,display:"flex",justifyContent:"space-between"}}>
     
      <TextInput handleChange={(e)=>setval({...val,value:e.target.value})} focused="true" value={val.value} sx={{width:"75%"}} />

          <Button color="success" variant="contained" onClick={()=>updateHandler()} sx={{ px: 3, py: 0.5 }}>Update</Button>
        
    </Card>)
    }

    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      
      <CardHeader>
        <Title>Social account Listed</Title>
        <div>
        {/* <Link  to="add"   style={{textDecoration:'none',width:'100%',marginBottom:"1vmax",}}>
          <Button color="success" variant="contained" sx={{ px: 3, py: 0.5 }}>Add</Button>
        </Link> */}
        </div>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable size='small'>
        <TableHead>
        <TableRow>
              <TableCell sx={{ px: 3 }}>
                Social Handle
              </TableCell>
              <TableCell sx={{ px: 0 }} >
                  Link
                </TableCell>
              {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell> */}
              <TableCell align='center' sx={{ px: 0 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {socialHandles?.length>0?( socialHandles.map((data, index) => (
              <TableRow key={index} hover>
                <TableCell  align="left" sx={{ px: 0,width:"25%", textTransform: 'capitalize'}}>
               
                    {/* <p>{index + 1}.</p> */}
                    <Paragraph sx={{ m: 0, ml: 1 }}>{index+1}. {data.handle}</Paragraph>
                 
                </TableCell>

                <TableCell align="left"  sx={{ px: 0}}>
                    {data.handleLink }
                  </TableCell>

                {/* <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.available ? (
                    product.available < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.available} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell> */}

                <TableCell align="center" sx={{ px: 0 ,width:"25%"}}>
                
                  <IconButton onClick={()=>toggleHandler(data.handleLink,data.id)} aria-label="delete" size="small" sx={{mr:1}}>
                    <EditIcon />
                  </IconButton>
                  {/* <IconButton aria-label="delete" size="small">
                    <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            )))
            : <p>No Handles Found</p>
            }
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
    </>
  );
};

const productList = [
  {

    name: 'Instagram',
    price:5

  },
  {

    name: 'Twitter',
    price:0
  },
  {

    name: 'Facebook',

  },
  {

    name: 'Phone number',

  },

];

export default SocialList;
