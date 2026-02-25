import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const layoutStyles = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    p: 3,
    minHeight: "100vh",
  },
};

function Layout() {
  return (
    <Box sx={layoutStyles.root}>
      <Sidebar />
      <Box component="main" sx={layoutStyles.content}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
