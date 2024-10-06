import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import throttle from "lodash.throttle"
import MegaMenu from "./MegaMenu"
import useWindowWidth from "../Hooks/useWindowWidth"
import NavMenu from "./NavMenu"


function Header() {
    const [megaMenuVisibility, setMegaMenuVisibility] = useState(false)
    const [navMenuVisibility, setNavMenuVisibility] = useState(true)
    const [navMenuHidden, setNavMenuHidden] = useState(true)
    const [isOnTop, setIsOnTop] = useState<boolean>(false)
    const [menu, setMenu] = useState<number>(1)
    const width = useWindowWidth()

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
        if(!navMenuVisibility){
            setTimeout(() => setNavMenuHidden(true), 400);
        }else{
            setNavMenuHidden(false)
        }
    }, [navMenuVisibility])

    const handleMouseLeave = () => {
        setMegaMenuVisibility(false)
    }

    const topMenuClassName = `top_menu ${isOnTop ? megaMenuVisibility || navMenuVisibility ? 'black' : '' : 'black'}`

    return (
        <div onMouseLeave={handleMouseLeave} className="header">
            <div className={topMenuClassName}>
                {width < 1280 &&
                    <NavMenuButton setNavMenu={() => setNavMenuVisibility(!navMenuVisibility)} />
                }
                {width >= 1280 &&
                    <nav >
                        <NavButton
                            setMegaMenuVisibility={setMegaMenuVisibility}
                            to=""
                            line={menu == 1}
                            megaMenuVisibility={megaMenuVisibility}
                            name="Prendas"
                            setMenu={() => setMenu(1)} />
                        <NavButton
                            setMegaMenuVisibility={setMegaMenuVisibility}
                            to=""
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
                <h1 onMouseEnter={handleMouseLeave} translate="no">Sin Límite</h1>
                <div onMouseEnter={handleMouseLeave} className="user">
                    <span
                        style={{ fontSize: "2.1rem", marginTop: "0.2rem" }}
                        translate="no"
                        className="material-symbols-outlined">
                        search
                    </span>
                    <span
                        style={{ fontSize: "2rem" }}
                        translate="no"
                        className="material-symbols-outlined">
                        account_circle
                    </span>
                    <p>
                        <span
                            style={{ fontSize: "1.9rem" }}
                            translate="no"
                            className="material-symbols-outlined">
                            shopping_bag
                        </span>
                        0
                    </p>
                </div>
            </div>
            {megaMenuVisibility && <MegaMenu menu={menu} setMegaMenuVisibility={setMegaMenuVisibility} />}
            <NavMenu className={`${navMenuVisibility ? 'open' : 'close'} ${navMenuHidden ? 'hidden' : ''}`}/>
        </div>
    )
}

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

