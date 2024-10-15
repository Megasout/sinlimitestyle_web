import { Link } from "react-router-dom"

type MegaMenuType = {
    setMegaMenuVisibility: (value: boolean) => void,
    menu: number
}

function MegaMenu(props: MegaMenuType) {
    const { menu, setMegaMenuVisibility } = props

    const handleClose = () => {
        setMegaMenuVisibility(false)
    }

    return (
        <>
            {menu == 1 && <Menu1 handleClose={handleClose} />}
            {menu == 2 && <Menu2 handleClose={handleClose} />}
            {menu == 3 && <Menu3 handleClose={handleClose} />}
        </>
    )
}

export default MegaMenu

type MenuType = {
    handleClose: () => void
}

function Menu1(props: MenuType) {
    const { handleClose } = props

    return (
        <div className="mega_menu">
            <h3>Por Categorias</h3>
            <div className="categories">
                <div className="block">
                    <Link to={'./tienda?filtro=prendas'}>Ver todas las prendas</Link>
                    <Link to={''}>Categoria 1</Link>
                    <Link to={''}>Categoria 2</Link>
                    <Link to={''}>Categoria 3</Link>
                    <Link to={''}>Categoria 4</Link>
                    <Link to={''}>Categoria 5</Link>
                    <Link to={''}>Categoria 6</Link>
                    <Link to={''}>Categoria 7</Link>
                </div>
                <div className="block">
                    <Link to={''}>Categoria 8</Link>
                    <Link to={''}>Categoria 9</Link>
                    <Link to={''}>Categoria 10</Link>
                    <Link to={''}>Categoria 11</Link>
                    <Link to={''}>Categoria 12</Link>
                    <Link to={''}>Categoria 13</Link>
                    <Link to={''}>Categoria 14</Link>
                    <Link to={''}>Categoria 15</Link>
                </div>
                <div className="line"></div>
                <div className="off">
                    <span
                        style={{ fontSize: "5rem" }}
                        translate="no"
                        className="material-symbols-outlined">
                        Apparel
                    </span>
                    <h2>
                        Prendas en Descuento
                    </h2>
                </div>
                <ButtonClose onClick={handleClose} />
            </div>
        </div>
    )
}

function Menu2(props: MenuType) {
    const { handleClose } = props

    return (
        <div className="mega_menu">
            <h3>Por Categorias</h3>
            <div className="categories">
                <div className="block">
                    <Link to={'./tienda?filtro=accesorios'}>Ver todos los accesorios</Link>
                    <Link to={''}>Categoria 1</Link>
                    <Link to={''}>Categoria 2</Link>
                    <Link to={''}>Categoria 3</Link>
                    <Link to={''}>Categoria 4</Link>
                    <Link to={''}>Categoria 5</Link>
                    <Link to={''}>Categoria 6</Link>
                    <Link to={''}>Categoria 7</Link>
                </div>
                <div className="block">
                    <Link to={''}>Categoria 8</Link>
                    <Link to={''}>Categoria 9</Link>
                    <Link to={''}>Categoria 10</Link>
                    <Link to={''}>Categoria 11</Link>
                    <Link to={''}>Categoria 12</Link>
                    <Link to={''}>Categoria 13</Link>
                    <Link to={''}>Categoria 14</Link>
                    <Link to={''}>Categoria 15</Link>
                </div>
                <div className="line"></div>
                <div className="off">
                    <span
                        style={{ fontSize: "5rem" }}
                        translate="no"
                        className="material-symbols-outlined">
                        Sell
                    </span>
                    <h2>
                        Accesorios en Descuento
                    </h2>
                </div>
                <ButtonClose onClick={handleClose} />
            </div>
        </div>
    )
}

function Menu3(props: MenuType) {
    const { handleClose } = props

    return (
        <div className="mega_menu">
            <div style={{marginTop: "2rem"}} className="categories">
                <p>Ver todas las colecciones</p>

                <div className="line"></div>
                <div className="collections">
                    <div className="collection">
                    </div>
                    <div className="collection">
                    </div>
                    <div className="collection">
                    </div>
                </div>
                
                <ButtonClose onClick={handleClose} />
            </div>
        </div>
    )
}

type ButtonCloseType = {
    onClick: () => void
}

function ButtonClose(prop: ButtonCloseType) {
    const { onClick } = prop

    return (
        <span
            onClick={onClick}
            style={{ fontSize: "2rem", userSelect: "none" }}
            translate="no"
            className="close material-symbols-outlined">
            close
        </span>
    )
}