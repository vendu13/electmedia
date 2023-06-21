import { Box, MenuItem, MenuList, Popover } from '@mui/material';
import { logoutAction } from '../../Store/Action/AdminActions/AuthActions/AuthActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const AccountPopover = (props) => {
  const dispatch=useDispatch()
  const { anchorEl, onClose, open, ...other } = props;
const navigate=useNavigate()

  const handleSignOut=()=>{
    dispatch(logoutAction(navigate))
    navigate("/api/v1/admin")
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        {/* <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          John Doe
        </Typography> */}
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={()=>handleSignOut()}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

// AccountPopover.propTypes = {
//   anchorEl: PropTypes.any,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired
// };
