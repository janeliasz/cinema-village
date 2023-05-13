import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

function TopBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ typography: { xs: "h5", md: "h4" } }}>
            Cinema Village
          </Typography>

          <TopBarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const menuItems = [
  {
    name: "shows",
    to: "/shows",
  },
  {
    name: "about",
    to: "/",
  },
  {
    name: "contact",
    to: "/",
  },
];

function TopBarMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {menuItems.map((menuItem) => (
          <Typography
            key={menuItem.name}
            sx={{
              marginLeft: "1rem",
              textTransform: "uppercase",
            }}
          >
            <NavLink
              to={menuItem.to}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {menuItem.name}
            </NavLink>
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          aria-label="menu options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon sx={{ scale: "1.2" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.name}>
              <Typography
                key={menuItem.name}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                <NavLink
                  to={menuItem.to}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {menuItem.name}
                </NavLink>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}

export default TopBar;
