import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const layoutStyles = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    p: 0,
    minHeight: "100vh",
  },
};

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "circIn",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.1,
    },
  },
};

function Layout() {
  const location = useLocation();

  return (
    <Box sx={layoutStyles.root}>
      <Sidebar />
      <Box component="main" sx={layoutStyles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default Layout;
