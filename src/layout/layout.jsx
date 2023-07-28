import { Link, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import ButtonNavigation from "../components/ButtonNavigation";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
export default function LayoutHome() {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Outlet />
      <Box sx={{ width: "100vw", position: "absolute", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={
              <HomeOutlinedIcon
                onClick={() => navigate("../../home/home/user")}
              />
            }
          />
          <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
          <BottomNavigationAction
            label="Setting"
            icon={<SettingsOutlinedIcon />}
          />
        </BottomNavigation>
      </Box>
      )
    </>
  );
}
