import { Box, Container } from '@mui/material';

import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../../Components/DashboardLayout';

const Admin = () => (
  

  <>
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
          // width=100
        }}
      >
        <Container maxWidth={false} >
          {/* <Grid
            container
            spacing={3}
            direction="row"
  justifyContent="center"
  alignItems="center"
          >
            <Grid item lg={8} md={8} sm={12} xs={12}> */}
              {/* <Item>xs=6 md=4</Item> */}
            <Outlet />
            {/* </Grid> */}

          {/* </Grid> */}
        </Container>
      </Box>

    </DashboardLayout>
  </>
);

// Page.getLayout = (page) => (
//   console.log(page)
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Admin;