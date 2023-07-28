import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    localStorage.removeItem("PROFILE_DATA");

    window.location.href = "/";
  };

  function renderBackButton() {
    if (location.pathname === "/" || location.pathname === "/home/home/user") {
      // If the current route is either '/' or '/home/user', don't render the back button
      return null;
    } else {
      // Otherwise, render a back button that navigates to the previous page
      return (
        // <Link to="#" >
        <HomeOutlinedIcon onClick={() => navigate("../../home/home/user")} />
        // </Link>
      );
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          display: "flex",
          justifyContent: "center",
          background: "white",
          height: "70px",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            {renderBackButton()}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Sx Bank
          </Typography>
          {auth && (
            <div>
             {Cookies.get("role") === "admin" && (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="black"
        >
          <NotificationsNoneOutlinedIcon
            onClick={() => navigate("../../home/admin/notification")}
          />
        </IconButton>
      )}

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="black"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("../../home/profile")}>
                  Profile
                </MenuItem>

                {Cookies.get("role") === "admin" && (
                  <MenuItem onClick={() => navigate("../../home/home/admin")}>
                    Admin Panel
                  </MenuItem>
                )}

                <MenuItem onClick={() => navigate("/settings")}>
                  Setting
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
