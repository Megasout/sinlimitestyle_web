import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import throttle from "lodash.throttle"
import MegaMenu from "./MegaMenu"
import useWindowWidth from "../Hooks/useWindowWidth"
import NavMenu from "./NavMenu"

type HeaderType = {
    black: boolean,
    shop: boolean
}

export interface HeaderRef {
    hiddenNavMenu: () => void
}

const Header = forwardRef((props: HeaderType, ref) => {
    const { black, shop } = props

    const [megaMenuVisibility, setMegaMenuVisibility] = useState(false)
    const [navMenuVisibility, setNavMenuVisibility] = useState(false)
    const [navMenuHidden, setNavMenuHidden] = useState(true)
    const timeOutMenu = useRef<number | undefined>()
    const [isOnTop, setIsOnTop] = useState<boolean>(true)
    const [menu, setMenu] = useState<number>(1)
    const width = useWindowWidth()
    const navigation = useNavigate()

    useEffect(() => {
        setMegaMenuVisibility(false)
        setNavMenuVisibility(false)
    }, [width])

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (window.scrollY > 0) {
                setIsOnTop(false)
            } else {
                setIsOnTop(true)
            }
        }, 200)

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!navMenuVisibility) {
            timeOutMenu.current = setTimeout(() => setNavMenuHidden(true), 400);
        } else {
            clearTimeout(timeOutMenu.current)
            setNavMenuHidden(false)
        }

        return () => {
            clearTimeout(timeOutMenu.current)
        }
    }, [navMenuVisibility])

    const handleMouseLeave = () => {
        setMegaMenuVisibility(false)
    }

    useImperativeHandle(ref, () => ({
        hiddenNavMenu: () => setNavMenuVisibility(false)
    }))

    const topMenuClassName = `top_menu ${black ? 'black' : isOnTop ? megaMenuVisibility || navMenuVisibility ? 'black' : '' : 'black'}`

    return (
        <div style={{ height: !navMenuHidden ? '100vh' : 'auto' }} onMouseLeave={handleMouseLeave} className="header">
            <div className={topMenuClassName}>
                {width < 1280 &&
                    <NavMenuButton setNavMenu={() => setNavMenuVisibility(!navMenuVisibility)} />
                }
                {width >= 1280 &&
                    <nav >
                        <NavButton
                            setMegaMenuVisibility={setMegaMenuVisibility}
                            to="./tienda?filtro=prendas"
                            line={menu == 1}
                            megaMenuVisibility={megaMenuVisibility}
                            name="Prendas"
                            setMenu={() => setMenu(1)} />
                        <NavButton
                            setMegaMenuVisibility={setMegaMenuVisibility}
                            to="./tienda?filtro=accesorios"
                            line={menu == 2}
                            megaMenuVisibility={megaMenuVisibility}
                            name="Accesorios"
                            setMenu={() => setMenu(2)} />
                        <NavButton
                            setMegaMenuVisibility={setMegaMenuVisibility}
                            to=""
                            line={menu == 3}
                            megaMenuVisibility={megaMenuVisibility}
                            name="Colecciones"
                            setMenu={() => setMenu(3)} />
                    </nav>
                }
                <h1 onClick={() => navigation('/')} onMouseEnter={handleMouseLeave} translate="no">Sin Límite</h1>
                <div onMouseEnter={handleMouseLeave} className="user">
                    {!shop &&
                        <div className="button">
                            <span
                                style={{ fontSize: width < 500 ? "1.9rem" : "2.1rem", marginTop: "0.2rem" }}
                                translate="no"
                                className="material-symbols-outlined">
                                search
                            </span>
                        </div>}
                    {width >= 660 &&
                        <div className="button">
                            <span
                                style={{ fontSize: "2rem" }}
                                translate="no"
                                className="material-symbols-outlined">
                                account_circle
                            </span>
                        </div>}
                    <div className="button">
                        <p>
                            <span
                                style={{ fontSize: width < 500 ? "1.7rem" : "1.9rem" }}
                                translate="no"
                                className="material-symbols-outlined">
                                shopping_bag
                            </span>
                            0
                        </p>
                    </div>
                </div>
            </div>
            {megaMenuVisibility && <MegaMenu menu={menu} setMegaMenuVisibility={setMegaMenuVisibility} />}
            <NavMenu
                className={`${navMenuVisibility ? 'open' : 'close'} ${navMenuHidden ? 'hidden' : ''}`}
                setNavMenuVisibility={setNavMenuVisibility} />
        </div>
    )
})

export default Header

type NavButtonType = {
    name: string,
    to: string,
    line: boolean,
    megaMenuVisibility: boolean,
    setMegaMenuVisibility: (value: boolean) => void,
    setMenu: () => void
}

function NavButton(props: NavButtonType) {
    const { name, to, line, megaMenuVisibility, setMegaMenuVisibility, setMenu } = props

    const handleMouseEnter = () => {
        setMegaMenuVisibility(true)
        setMenu()
    }

    return (
        <Link
            className={line && megaMenuVisibility ? 'border' : ''}
            to={to}
            onMouseEnter={handleMouseEnter}>{name}</Link>
    )
}

type NavMenuButtonType = {
    setNavMenu: () => void
}

function NavMenuButton(prop: NavMenuButtonType) {
    const { setNavMenu } = prop

    return (
        <nav>
            <div onClick={setNavMenu} className="menu_button">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </nav>
    )
}

