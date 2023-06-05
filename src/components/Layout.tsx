import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SnackbarProvider from "./snackbar/SnackbarProvider";

function Layout() {
  return (
    <>
      <TopBar />
      <SnackbarProvider>
        <Outlet />
      </SnackbarProvider>
    </>
  );
}

export default Layout;
