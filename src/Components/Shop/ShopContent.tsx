type ShopContentType = {
    width: number,
    onClickFilterButton: () => void
}

function ShopContent(props: ShopContentType) {
    const { width, onClickFilterButton } = props

    return (
        <div className="content">
            <Options width={width} onClickFilterButton={onClickFilterButton} />
            <div className="blocks">
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
            </div>
        </div>
    )
}

export default ShopContent

type OptionsType = {
    width: number,
    onClickFilterButton: () => void
}

function Options(props: OptionsType) {
    const { width, onClickFilterButton } = props

    return (
        <div className="options">
            {width >= 1280 &&
                <>
                    <div className="button">
                        <span
                            translate="no"
                            className="material-symbols-outlined">
                            grid_view
                        </span>
                    </div>
                    <div className="button">
                        <span
                            translate="no"
                            className="material-symbols-outlined">
                            list
                        </span>
                    </div>
                    <div className="sorting">
                        <label>Ordenar por </label>
                        <select>
                            <option>Relevancia</option>
                            <option>Mayor Precio</option>
                            <option>Menor Precio</option>
                        </select>
                    </div>
                    <div style={{ width: '100%' }}></div>
                    <div className="search">
                        <input type="search" placeholder="Buscar Productos..."></input>
                        <span
                            translate="no"
                            className="material-symbols-outlined">
                            search
                        </span>
                    </div>
                </>
            }
            {width < 1280 && width >= 470 &&
                <>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={onClickFilterButton}>
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                menu
                            </span>Filtros</button>
                        <div style={{ width: '100%' }}></div>
                        <div className="search">
                            <input type="search" placeholder="Buscar Productos..."></input>
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                search
                            </span>
                        </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <div className="button">
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                grid_view
                            </span>
                        </div>
                        <div className="button">
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                list
                            </span>
                        </div>
                        <div style={{ width: "100%" }}></div>
                        <div className="sorting">
                            <label>Ordenar por </label>
                            <select>
                                <option>Relevancia</option>
                                <option>Mayor Precio</option>
                                <option>Menor Precio</option>
                            </select>
                        </div>
                    </div>
                </>
            }
            {width < 470 &&
                <>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <div style={width >= 315 ? { width: "100%" } : {}} className="search">
                            <input
                                style={{ width: "100%", minHeight: "35.59px" }}
                                type="search"
                                placeholder="Buscar Productos..."></input>
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                search
                            </span>
                        </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={onClickFilterButton}>
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                menu
                            </span>Filtros</button>
                        <div style={{ width: '100%' }}></div>
                        <div className="button">
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                grid_view
                            </span>
                        </div>
                        <div className="button">
                            <span
                                translate="no"
                                className="material-symbols-outlined">
                                list
                            </span>
                        </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "end" }}>
                        <div className="sorting">
                            <label>Ordenar por </label>
                            <select>
                                <option>Relevancia</option>
                                <option>Mayor Precio</option>
                                <option>Menor Precio</option>
                            </select>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}