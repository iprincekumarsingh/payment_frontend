import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Outlet, Link } from 'react-router-dom';

const styles = {
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    margin: '0 auto',
    // backgroundColor: '#0a2351',
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
          className='bg-primary'
        >
          <BottomNavigationAction component={Link}

            to="home/user" label="Home" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction component={Link} to="home/card" label="Cards" icon={<CreditCardOutlinedIcon />} />
          <BottomNavigationAction component={Link} label="Transaction" icon={<SyncAltOutlinedIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonOutlineOutlinedIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}