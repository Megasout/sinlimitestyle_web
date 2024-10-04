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
        <div className="mega_menu">
            <h3>Por Categorias</h3>
            <div className="categories">
                <div>
                    {menu == 1 ? <p>Ver todas las prendas</p> : <p>Ver todas los accesorios</p>}
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
                <span
                    onClick={handleClose}
                    style={{ fontSize: "2rem", userSelect: "none" }}
                    translate="no"
                    className="close material-symbols-outlined">
                    close
                </span>
            </div>
        </div>
    )
}

export default MegaMenu