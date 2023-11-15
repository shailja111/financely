import Layout from "../Layout";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Cards from "../components/Cards";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <Layout component={<Signup />} />,
  },
  {
    id: 2,
    path: "/dashboard",
    element: <Layout component={<Dashboard />} />,
  },
  {
    id: 3,
    path: "/cards",
    element: <Layout component={<Cards />} />,
  },
];
