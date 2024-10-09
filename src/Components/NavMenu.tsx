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

            <NavButton icon="home" text="Pagina Principal"/>
            <div className="line"></div>
            <NavButton icon="Apparel" text="Prendas"/>
            <NavButton icon="category" text="Accesorios"/>
            <NavButton icon="lists" text="Colecciones"/>
            <NavButton icon="Sell" text="Ofertas"/>
            <div className="line"></div>
            <div style={{height: "100%"}}></div>
            <div className="line"></div>
            <NavButton icon="account_circle" text="Usuario"/>
            <NavButton icon="info" text="Contacto"/>
            <div style={{marginTop: "5rem"}}></div>
        </div>
    )
}

export default NavMenu

type NavButtonType = {
    icon: string,
    text: string
}

function NavButton(props: NavButtonType) {
    const {icon, text} = props

    return (
        <div className="button">
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
    )
}