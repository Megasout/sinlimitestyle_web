import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])

export default router