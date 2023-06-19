import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SnackbarProvider from "./snackbar/SnackbarProvider";
import GlobalLoadingProvider from "./global-loading/GlobalLoadingProvider";

function Layout() {
  return (
    <>
      <TopBar />
      <GlobalLoadingProvider>
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </GlobalLoadingProvider>
    </>
  );
}

export default Layout;
