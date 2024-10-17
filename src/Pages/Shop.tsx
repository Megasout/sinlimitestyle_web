import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"

function Shop() {
    return (
        <div className="shop">
            <Filters />
            <div className="content"></div>
        </div>
    )
}

export default Shop