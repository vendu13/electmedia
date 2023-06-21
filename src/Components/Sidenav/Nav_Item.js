import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const active=false
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
        flex:1
      }}
      {...others}
    >
    <Link to={href}  style={{textDecoration:'none',width:'100%',marginBottom:"1vmax"}}>
    
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            // bgcolor:'red',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 2.5,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            fontSize:12,
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
              fontSize:8
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
        </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
