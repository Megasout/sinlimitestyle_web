import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import throttle from "lodash.throttle"
import MegaMenu from "./MegaMenu"


function Header() {
    const [megaMenuVisibility, setMegaMenuVisibility] = useState(false)
    const [isOnTop, setIsOnTop] = useState<boolean>(false)
    const [menu, setMenu] = useState<number>(1)

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

    const handleMouseLeave = () => {
        setMegaMenuVisibility(false)
    }

    return (
        <div onMouseLeave={handleMouseLeave} className="header">
            <div className={`top_menu ${isOnTop ? megaMenuVisibility ? 'black' : '' : 'black'}`}>
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