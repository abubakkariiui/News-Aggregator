import { Outlet, createBrowserRouter } from "react-router-dom";
import Business from "../pages/Business/Business";
import Tech from "../pages/Tech/Tech";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Header from "../components/common";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/business",
        element: <Business />,
      },
      {
        path: "/tech",
        element: <Tech />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
    ],
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
function Layout() {
  return (
    <>
      <Header />
      <div
        style={{ display: "flex", minHeight: "100vh", background: "#f9f9f9" }}
      >
        <Outlet />
      </div>
    </>
  );
}
