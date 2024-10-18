import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"

function Shop() {
    return (
        <div className="shop">
            <Filters />
            <div className="content">
                <div className="options">
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
                    <div style={{width: '100%'}}></div>
                    <div className="search">
                        <input type="text" placeholder="Buscar Productos..."></input>
                        <span
                            translate="no"
                            className="material-symbols-outlined">
                            search
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop