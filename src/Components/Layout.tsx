import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"

import "../Styles/layout.scss"
import Footer from "./Footer"
import { useEffect, useState } from "react"

function Layout() {
    const location = useLocation()
    const [topMenuBlack, setTopMenuBlack] = useState(false)
    const [shop, setShop] = useState(false)

    useEffect(()=> {
        setTopMenuBlack(location.pathname != '/')
        setShop(location.pathname == '/tienda')
    }, [location])

    return (
        <div className="layout">
            <Header shop={shop} black={topMenuBlack}/>
            <Outlet />
            <Footer/>
        </div >
    )
}

export default Layout