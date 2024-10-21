import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"
import ShopContent from "../Components/Shop/ShopContent"
import useWindowWidth from "../Hooks/useWindowWidth"
import SideFilters, { ShopSideFiltersRef } from "../Components/Shop/SideFilters"
import { useRef } from "react"

function Shop() {
    const width = useWindowWidth()
    const sideFilterRef = useRef<ShopSideFiltersRef>()

    const onClickfilterButton = () => {
        sideFilterRef.current?.showFilters()
    }

    return (
        <div className="shop">
            <div className="banner">
                <h1>Pagina principal{' > '} Accesorios</h1>
            </div>
            <div className="body">
                {width >= 1280 &&
                    <Filters/>}
                <ShopContent width={width} onClickFilterButton={onClickfilterButton}/>
            </div>
            <SideFilters ref={sideFilterRef} width={width}/>
        </div>
    )
}

export default Shop