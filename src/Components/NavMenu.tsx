import { useNavigate } from "react-router-dom"

type NavMenuType = {
    className: string
    setNavMenuVisibility: (value: boolean) => void
}

function NavMenu(props: NavMenuType) {
    const { className, setNavMenuVisibility } = props
    return (
        <div className={`nav_menu ${className}`}>
            <span
                onClick={() => setNavMenuVisibility(false)}
                style={{ fontSize: "2rem", userSelect: "none" }}
                translate="no"
                className="close_button material-symbols-outlined">
                close
            </span>

            <NavButton className={className} to="/" icon="home" text="Pagina Principal" />
            <div className="line"></div>
            <NavButton className={className} to="./tienda?filtro=prendas" icon="Apparel" text="Prendas" />
            <NavButton className={className} to="./tienda?filtro=accesorios" icon="category" text="Accesorios" />
            <NavButton className={className} to="" icon="lists" text="Colecciones" />
            <NavButton className={className} to="" icon="Sell" text="Ofertas" />
            <div className="line"></div>
            <div style={{ height: "100%" }}></div>
            <div className="line"></div>
            <NavButton className={className} to="" icon="account_circle" text="Usuario" />
            <NavButton className={className} to="" icon="info" text="Contacto" />
            <div style={{ marginTop: "5rem" }}></div>
        </div>
    )
}

export default NavMenu

type NavButtonType = {
    className: string,
    icon: string,
    text: string,
    to: string
}

function NavButton(props: NavButtonType) {
    const { className, icon, text, to } = props
    const navigation = useNavigate()

    const handleOnClick = () => {
        if (!className.includes('close'))
            navigation(to)
    }

    return !className.includes('hidden') ? (
        <div className="button" onClick={handleOnClick}>
            <span
                style={{ userSelect: "none" }}
                translate="no"
                className="material-symbols-outlined">
                {icon}
            </span>
            <p>{text}</p>
            <span
                style={{ userSelect: "none" }}
                translate="no"
                className="material-symbols-outlined">
                chevron_right
            </span>
        </div>
    ) : <></>
}