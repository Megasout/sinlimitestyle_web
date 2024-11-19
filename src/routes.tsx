import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Shop, { loader as shopData } from "./Pages/Shop";
import Product, {loader as productData} from "./Pages/Product";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'tienda',
                element: <Shop />,
                loader: shopData
            },
            {
                path: 'tienda/:ID/producto',
                element: <Product />,
                loader: productData
            }
        ]
    }
])

export default router