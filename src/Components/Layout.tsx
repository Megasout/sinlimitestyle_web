import { Outlet, useLocation } from "react-router-dom"
import Header, { HeaderRef } from "./Header"

import "../Styles/layout.scss"
import Footer from "./Footer"
import { useEffect, useRef, useState } from "react"

function Layout() {
    const location = useLocation()
    const [topMenuBlack, setTopMenuBlack] = useState(false)
    const [shop, setShop] = useState(false)
    const headerRef = useRef<HeaderRef>()

    useEffect(()=> {
        setTopMenuBlack(location.pathname != '/')
        setShop(location.pathname == '/tienda')
        headerRef.current?.hiddenNavMenu()
    }, [location])

    return (
        <div className="layout">
            <Header ref={headerRef} shop={shop} black={topMenuBlack}/>
            <Outlet />
            <Footer/>
        </div >
    )
}

export default Layout