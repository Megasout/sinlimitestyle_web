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
                <div>
                    <p>Ver todas las prendas</p>
                    <p>Categoria 1</p>
                    <p>Categoria 2</p>
                    <p>Categoria 3</p>
                    <p>Categoria 4</p>
                    <p>Categoria 5</p>
                    <p>Categoria 6</p>
                    <p>Categoria 7</p>
                </div>
                <div>
                    <p>Categoria 8</p>
                    <p>Categoria 9</p>
                    <p>Categoria 10</p>
                    <p>Categoria 11</p>
                    <p>Categoria 12</p>
                    <p>Categoria 13</p>
                    <p>Categoria 14</p>
                    <p>Categoria 15</p>
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
                <div>
                    <p>Ver todos los accesorios</p>
                    <p>Categoria 1</p>
                    <p>Categoria 2</p>
                    <p>Categoria 3</p>
                    <p>Categoria 4</p>
                    <p>Categoria 5</p>
                    <p>Categoria 6</p>
                    <p>Categoria 7</p>
                </div>
                <div>
                    <p>Categoria 8</p>
                    <p>Categoria 9</p>
                    <p>Categoria 10</p>
                    <p>Categoria 11</p>
                    <p>Categoria 12</p>
                    <p>Categoria 13</p>
                    <p>Categoria 14</p>
                    <p>Categoria 15</p>
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