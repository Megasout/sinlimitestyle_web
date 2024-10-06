type NavMenuType = {
    className: string
}

function NavMenu(props: NavMenuType) {
    const { className } = props
    return (
        <div className={`nav_menu ${className}`}>

        </div>
    )
}

export default NavMenu