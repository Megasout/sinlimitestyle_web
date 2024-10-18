import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"
import ShopContent from "../Components/Shop/ShopContent"
import useWindowWidth from "../Hooks/useWindowWidth"

function Shop() {
    const width = useWindowWidth()

    return (
        <div className="shop">
            <div className="banner">
                <h1>Pagina principal{' > '} Accesorios</h1>
            </div>
            <div className="body">
                {width >= 1280 &&
                    <Filters/>}
                <ShopContent width={width}/>
            </div>
        </div>
    )
}

export default Shop