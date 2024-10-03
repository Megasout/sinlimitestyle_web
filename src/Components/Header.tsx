import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import throttle from "lodash.throttle"

function Header() {
    const [isOnTop, setIsOnTop] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = throttle(() => {
            console.log('a')
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

    return (
        <div className={`header ${isOnTop ? '' : 'black'}`}>
            <nav>
                <Link to={''} >Prendas</Link>
                <Link to={''}>Accesorios</Link>
                <Link to={''}>Colecciones</Link>
            </nav>
            <h1>Sin Limite</h1>
            <div className="user">
                <span
                    style={{ fontSize: "2.1rem", marginTop: "0.2rem" }}
                    className="material-symbols-outlined">
                    search
                </span>
                <span
                    style={{ fontSize: "2rem" }}
                    className="material-symbols-outlined">
                    account_circle
                </span>
                <p>
                    <span
                        style={{ fontSize: "1.9rem" }}
                        className="material-symbols-outlined">
                        shopping_bag
                    </span>
                    0
                </p>
            </div>
        </div>
    )
}

export default Header