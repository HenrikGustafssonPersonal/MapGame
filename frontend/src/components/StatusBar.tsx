import { AccountCircle, Height } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function StatusBar() {
  const navigate = useNavigate();

  function handleNav(s: string) {
    navigate("/" + s);
  }
  const { currentUser, signOut } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerStatus, setdrawerStatus] = React.useState({
    open: false,
  });

  const toggleDrawer = (open: boolean) => () => {
    setdrawerStatus({ ...drawerStatus, open: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250, flex: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div style={{ display: "flex" }}>
        <AccountCircle sx={{ fontSize: 50 }} />
        <Typography variant="h5" component="div" sx={{ padding: 1 }}>
          {currentUser?.email}
        </Typography>
      </div>
      <List>
        {["Home", "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNav(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <PersonIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Leaderboard", "Stats"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNav(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <EmojiEventsIcon /> : <EqualizerIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const SignOut = () => {
    signOut();
  };
  return (
    <AppBar
      position="static"
      style={{ background: "linear-gradient(10deg,#ff0000, #0000ff)" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor={"left"}
          open={drawerStatus["open"]}
          onClose={toggleDrawer(false)}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {list()}

          <Button sx={{ width: "100%", height: "10%" }} onClick={SignOut}>
            <Typography variant="h6">Sign Out</Typography>
          </Button>
        </Drawer>

        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Map Game
        </Typography>
        {currentUser != null && (
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ padding: 1 }}>
              {currentUser?.email}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
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
              <MenuItem onClick={() => handleNav("profile")}>
                My account
              </MenuItem>
              <MenuItem onClick={SignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default StatusBar;
