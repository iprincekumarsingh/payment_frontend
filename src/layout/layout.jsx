import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const styles = {
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#5e5c5c',
    borderTopWidth: '1px',
    borderColor: '#fff'

  },

};

export default function LayoutHome() {
  const [value, setValue] = React.useState(0);

  return (
    <div className='mb-10'>
      <Outlet></Outlet>
      <Box sx={{
        ...styles.bottomNavigation,
        "& .MuiBottomNavigationAction-root.Mui-selected": {
          color: "#0A79DF", // active color
          borderTopWidth: '1px',
          borderColor: 'gray'
        }
      }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);

          }}
          style={styles.bottomNavigation}
          className='bg-[#0d102c]'
        >
          <BottomNavigationAction component={Link}

            to="user" label="Home" icon={<HomeOutlinedIcon />} />
        
          <BottomNavigationAction component={Link} to="profile" label="Profile" icon={<PersonOutlineOutlinedIcon />} />
          {Cookies.get("role") === "admin" ? (
            // <BottomNavigationAction component={Link} to="notification" label="Notification" icon={<SyncAltOutlinedIcon />} />
            <BottomNavigationAction component={Link} to="admin" label="Admin Panel" icon={<AdminPanelSettingsOutlinedIcon />} />
          ) : null
          }
        
        </BottomNavigation>
      </Box>
    </div>
  );
}