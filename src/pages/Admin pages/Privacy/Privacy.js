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

// import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader/Loader';
import { deletePolicy, fetchPolicy } from '../../../Store/Action/AdminActions/SectionActions/sectionAction';
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
  minWidth: 400,
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

const PrivacyTable = () => {
  // const { palette } = useTheme();
  const dispatch = useDispatch()
  const bgError = "#FF3D57";
  const bgPrimary = '#1976d2';
  const bgSecondary = '#FFAF38';
  useEffect(() => {
    dispatch(fetchPolicy())
  }, [])
  const { policies, sectionLoader } = useSelector(
    state => state.navSection
  )
  if (sectionLoader) {
    return <Loader />
  }
  const deletehandler=(docid)=>{
    // console.log("object");
      dispatch(deletePolicy(docid))
  }
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Privacy Policies</Title>
        {/* <div>
          <Link to="add" style={{ textDecoration: 'none', width: '100%', marginBottom: "1vmax", }}>
            <Button color="success" variant="contained" sx={{ px: 3, py: 0.5 }}>Add</Button>
          </Link>
        </div> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3,py:2.1}} >
                Name
              </TableCell>
              {/* <TableCell sx={{ px: 0 }}>
                  Body
                </TableCell> */}
              {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
                </TableCell> */}
              <TableCell align='center' sx={{ px: 0,py:2 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {policies?.length > 0 ? (policies.map((data, index) => (
              <TableRow key={index} hover>
                <TableCell align="left" sx={{ px: 0, textTransform: 'capitalize', width: "65%" }}>
                  <Box display="flex" alignItems="center">
                    <p>{index + 1}.</p>
                    <Paragraph sx={{ m: 0, ml: 4 }}>{data.label}</Paragraph>
                  </Box>
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

                <TableCell align='center' sx={{ px: 0, width: "35%" }} >

                <Link to={`edit/${data.id}`} style={{ textDecoration: 'none'}}>
                <IconButton  aria-label="delete" size="small" sx={{mr:1}}>
                    <EditIcon />
                  </IconButton>
                  </Link>
                  {/* <IconButton aria-label="delete" size="small" onClick={()=>deletehandler(data.id)}>
                    <DeleteIcon />
                  </IconButton> */}
                  
                </TableCell>
              </TableRow>
            )))
              :
              <p>No Policies found</p>
            }
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {

    name: 'TNC',
    price: 100,
    available: 15,
  },
  {

    name: 'Privacy Policy',
    price: 1500,
    available: 30,
  },

];

export default PrivacyTable;
