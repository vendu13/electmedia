import { useEffect } from 'react';
// import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import { NavItem } from './Nav_Item';
import logo from "../../Assets/Logo/logo.svg"
// import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
// import { Cog as CogIcon } from '../icons/cog';
// import { Lock as LockIcon } from '../icons/lock';
// import { Selector as SelectorIcon } from '../icons/selector';
// import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
// import { User as UserIcon } from '../icons/user';
// import { UserAdd as UserAddIcon } from '../icons/user-add';
// import { Users as UsersIcon } from '../icons/users';
// import { XCircle as XCircleIcon } from '../icons/x-circle';
// import { Logo } from './logo';
// import { NavItem } from './nav-item';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
const items = [
  {
    path: 'article',
    icon: (<ArticleIcon fontSize="small" />),
    title: 'Article'
  },
  {
    path: 'category',
    icon: (<CategoryIcon fontSize="small" color='white' />),
    title: 'Category'
  },
  {
    path: 'contacts',
    icon: (<LocalPhoneIcon fontSize="small" />),
    title: 'Contacts'
  },
  // {
  //   path: '/admin/policies',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  {
    path: 'privacy',
    icon: (<PrivacyTipIcon fontSize="small" />),
    title: 'Privacy'
  },
  // {
  //   path: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   path: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   path: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  // const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  // useEffect(
  //   () => {
  //     if (!router.isReady) {
  //       return;
  //     }

  //     if (open) {
  //       onClose?.();
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [router.asPath]
  // );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          
        }}
      >
        <div>
          <Box sx={{ py:2  }}>
            {/* <NextLink
              href="/"
              passHref
            > */}
              {/* <a> */}
                {/* <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                /> */}
              {/* </a> */}
            {/* </NextLink> */}
            <div style={{display:"flex"}}>
                <image/>
                <Link to='/api/v1/admin/article' style={{textDecoration:'none',color:"white",marginLeft:"1vmax"}}>
              <img src={logo} style={{width:"4.5vmax"}} alt="" srcset="" />
                

                </Link>
            </div>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                py: '11px',
                borderRadius: 1
              }}
            >
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1}}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.path}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          {/* <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography> */}
          {/* <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box> */}
          {/* <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          > */}
            {/* <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button> */}
          {/* </NextLink> */}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 230
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
